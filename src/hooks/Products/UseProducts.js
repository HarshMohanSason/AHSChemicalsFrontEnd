import { useCallback, useEffect, useState } from "react";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import { useAuth } from "../../contexts/AuthContext";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";
import { handleFirebaseError } from "../../utils/Firebase/ErrorHandler";
import {
	uploadMultipleFilesToStorage,
	uploadSingleFileToStorage,
} from "../../utils/Firebase/FirebaseStorage";
import {
	updateProductInFirestore,
	fetchProductsFromFirestore,
} from "../../utils/Firebase/Products";
import { beginQuickBooksAuth } from "../../utils/Quickbooks/Auth";
import { syncProducts } from "../../utils/Quickbooks/Products";
const useProducts = () => {
	const [fetchedProducts, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [filters, setFilters] = useState(null);
	const [selectedFilters, setSelectedFilters] = useState({
		Brands: [],
		Types: [],
	});
	const [groupedProducts, setGroupedProducts] = useState([]);
	const { alert } = useAlertContext();
	const { user } = useAuth();
	const loadingOverlay = useLoadingOverlayContext();

	const fetchProducts = useCallback(async () => {
		loadingOverlay.trigger();
		try {
			const getProducts = await fetchProductsFromFirestore();
			if (getProducts.length !== 0) {
				setProducts(getProducts);
				setFilteredProducts(getProducts);
			}
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			loadingOverlay.hide();
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	/**
	 * Begins the process of syncing products from QuickBooks to your application.
	 *
	 * Flow:
	 * 1. Triggers the loading overlay.
	 * 2. Checks if a user is authenticated.
	 * 3. Calls `syncProducts` to attempt to sync with QuickBooks.
	 *    - If successful (HTTP 200), it refetches the products and exits.
	 *    - If the error is not 401 (unauthorized), throws an error with the returned message.
	 *    - If the error is 401, it assumes the session expired and starts a new QuickBooks auth flow.
	 *      - If re-auth fails, throws an error.
	 * 4. Displays any errors as alert messages.
	 * 5. Always hides the loading overlay at the end.
	 */

	const beginProductsSync = async () => {
		loadingOverlay.trigger(); // Show loading overlay while syncing is in progress
		try {
			if (user) {
				// Attempt to sync products from QuickBooks
				const responseJson = await syncProducts(user);

				// If sync is successful, fetch updated products and return
				if (responseJson.code === 200) {
					await fetchProducts();
					alert.showAlert(
						"Products synced successfully with QuickBooks",
						"Success",
					);
					return;
				}

				// If error is NOT due to session expiration, throw the error
				if (responseJson.code !== 401) {
					throw new Error(responseJson.message);
				}

				// If session expired (401), notify user and start re-authentication
				if (responseJson.code === 401) {
					alert.showAlert(
						"QuickBooks session was logged out, logging into QuickBooks again. Try syncing again once QuickBooks is authenticated.",
						"Warning",
					);

					// Start QuickBooks authentication process
					await beginQuickBooksAuth(user);
				}
			}
		} catch (error) {
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const uploadProductImages = async (files, productID) => {
		try {
			const storageRef = `products/${productID}`;
			const filesURLs = await uploadMultipleFilesToStorage(
				files,
				storageRef,
			);
			await updateProductInFirestore({
				Id: productID,
				Images: filesURLs,
			});
		} catch (error) {
			throw error;
		}
	};

	const uploadProductSDS = async (file, productID) => {
		try {
			const storageRef = `products/${productID}/${file.name}`;
			const fileURL = await uploadSingleFileToStorage(file, storageRef);
			await updateProductInFirestore({ Id: productID, SDS: fileURL });
		} catch (error) {
			throw error;
		}
	};

	const saveProductEditedChanges = async (product) => {
		if (!product) return;
		if (!product.Id) return;
		if (!product.Images[0] && !product.SDS) return;
		loadingOverlay.trigger();
		try {
			await uploadProductImages(product.Images, product.Id);
			await uploadProductSDS(product.SDS, product.Id);
			alert.showAlert(
				"Successfully added the attachments to the product",
				"Success",
			);
		} catch (error) {
			alert.showAlert(handleFirebaseError(error.message), "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const getFilters = () => {
		const filters = { Brands: [], Types: [] };
		const brandSet = new Set();
		const typeSet = new Set();

		fetchedProducts.forEach((product) => {
			const orignialBrand = product?.Brand;
			const lowerCaseBrand = product?.Brand?.toLowerCase();
			const originalType = product?.ParentRef?.name;
			const lowerCaseType = product?.ParentRef?.name?.toLowerCase();

			if (orignialBrand && !brandSet.has(lowerCaseBrand)) {
				brandSet.add(lowerCaseBrand);
				filters.Brands.push(orignialBrand);
			}
			if (originalType && !typeSet.has(lowerCaseType)) {
				typeSet.add(lowerCaseType);
				filters.Types.push(originalType);
			}
		});
		setFilters(filters);
	};

	const groupProductsByNameKeys = () => {
		const mappedSameProducts = {};

		for (const product of fetchedProducts) {
			if (!product || !product.NameKey) continue;
			const newProduct = product;
			newProduct.Quantity = 0;
			if (!mappedSameProducts[newProduct.NameKey]) {
				mappedSameProducts[newProduct.NameKey] = [];
			}
			mappedSameProducts[newProduct.NameKey].push(newProduct);
		}
		setGroupedProducts(mappedSameProducts);
	};

	const getProductFromGroupedProducts = (nameKey) => {
		if (groupedProducts) {
			return groupedProducts[nameKey];
		}
	};

	useEffect(() => {
		if (fetchedProducts.length > 0) {
			getFilters();
			groupProductsByNameKeys();
		}
	}, [fetchedProducts]);

	const toggleFilter = (type, value) => {
		setSelectedFilters((prev) => {
			const updated = [...prev[type]];
			const valueLower = value.toLowerCase();
			const index = updated.indexOf(valueLower);
			if (index > -1) {
				updated.splice(index, 1);
			} else {
				updated.push(valueLower);
			}
			return { ...prev, [type]: updated };
		});
	};

	const filterProducts = () => {
		const newProducts = fetchedProducts.filter((product) => {
			const brandMatch =
				selectedFilters.Brands.length === 0 ||
				selectedFilters.Brands.includes(product?.Brand?.toLowerCase());

			const typeMatch =
				selectedFilters.Types.length === 0 ||
				selectedFilters.Types.includes(
					product?.ParentRef?.name?.toLowerCase(),
				);

			return brandMatch && typeMatch;
		});

		setFilteredProducts(newProducts);
	};

	useEffect(() => {
		filterProducts();
	}, [selectedFilters]);

	return {
		saveProductEditedChanges,
		beginProductsSync,
		filteredProducts,
		selectedFilters,
		filters,
		toggleFilter,
		getProductFromGroupedProducts,
	};
};

export default useProducts;
