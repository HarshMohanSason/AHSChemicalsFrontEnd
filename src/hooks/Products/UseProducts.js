import { useCallback, useEffect, useState } from "react";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";
import {
	deleteProductFromFirestore,
	deleteProductImagesFromStorage,
	fetchProductsFromFirestore,
	handleFirebaseError,
	updateProductInFirestore,
	uploadMultipleFilesToStorage,
	uploadProductToFirestore,
	uploadSingleFileToStorage,
} from "../../utils/firebase/firebase_utility";

const useProducts = () => {
	const [fetchedProducts, setProducts] = useState([]);
	const { alert } = useAlertContext();
	const loadingOverlay = useLoadingOverlayContext();

	const fetchProducts = useCallback(async () => {
		loadingOverlay.trigger();
		try {
			const getProducts = await fetchProductsFromFirestore();
			if (getProducts.length !== 0) {
				setProducts(getProducts);
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

	const validateProductDataBeforeUploading = (product) => {
		if (!validateBasicInfo(product)) return false;
		if (!validateVariants(product)) return false;
		if (!validateDescription(product)) return false;
		if (!validateImages(product)) return false;
		if (!validateSDS(product)) return false;
		if (!validateTags(product)) return false;

		return true;
	};

	const validateBasicInfo = (product) => {
		const requiredFields = [
			{ key: "name", label: "Product Name" },
			{ key: "brand", label: "Brand" },
			{ key: "type", label: "Type" },
			{ key: "hazard_type", label: "Hazard Type" },
		];
		for (const field of requiredFields) {
			if (!product[field.key] || product[field.key].trim() === "") {
				alert.showAlert(`Missing ${field.label}`, "Error");
				return false;
			}
		}
		return true;
	};

	const validateVariants = (product) => {
		if (!product.variants || product.variants.length === 0) {
			alert.showAlert(
				"Please add at least one product variant.",
				"Error",
			);
			return false;
		}
		for (const [index, variant] of product.variants.entries()) {
			if (
				!variant.size ||
				isNaN(variant.size) ||
				Number(variant.size) <= 0
			) {
				alert.showAlert(
					`Variant ${index + 1} must have a valid numeric size.`,
					"Error",
				);
				return false;
			}

			// Validate price (should be a number >= 0.01 or similar)
			if (
				!variant.price ||
				isNaN(variant.price) ||
				Number(variant.price) <= 0
			) {
				alert.showAlert(
					`Variant ${index + 1} must have a valid numeric price.`,
					"Error",
				);
				return false;
			}

			// Validate inventory (should be a number >= 0 or similar)
			if (
				!variant.inventory ||
				isNaN(variant.inventory) ||
				Number(variant.inventory) <= 0
			) {
				alert.showAlert(
					`Variant ${index + 1} must have a valid numeric inventory.`,
					"Error",
				);
				return false;
			}

			if (!variant.sku || variant.sku.trim() === "") {
				alert.showAlert(
					`Variant ${index + 1} must have a SKU.`,
					"Error",
				);
				return false;
			}
		}
		return true;
	};

	const validateDescription = (product) => {
		if (!product.description || product.description.trim() === "") {
			alert.showAlert("Please provide a product description.", "Error");
			return false;
		}
		return true;
	};

	const validateImages = (product) => {
		if (
			!product.images ||
			!Array.isArray(product.images) ||
			product.images.length === 0
		) {
			alert.showAlert(
				"Please upload at least one product image.",
				"Error",
			);
			return false;
		}
		return true;
	};

	const validateSDS = (product) => {
		if (!product.sds) {
			alert.showAlert(
				"Please upload the SDS (Safety Data Sheet).",
				"Error",
			);
			return false;
		}
		return true;
	};

	const validateTags = (product) => {
		if (
			!product.tags ||
			!Array.isArray(product.tags) ||
			product.tags.length === 0 ||
			product.tags[0].trim() === ""
		) {
			alert.showAlert(
				"Please provide at least one tag for the product.",
				"Error",
			);
			return false;
		}
		return true;
	};

	const uploadProduct = async (product) => {
		if (!validateProductDataBeforeUploading(product)) return;

		loadingOverlay.trigger();
		try {
			const imagesUrl = await uploadMultipleFilesToStorage(
				product.images,
				"products",
				product.id,
			);
			const sdsUrl = await uploadSingleFileToStorage(
				product.sds,
				"products",
				product.id,
			);
			product.images = imagesUrl;
			product.sds = sdsUrl;
			await uploadProductToFirestore(product);
			alert.showAlert("Successfully uploaded the product.", "Success");
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const updateProduct = async (product) => {
		if (!validateProductDataBeforeUploading(product)) return;

		loadingOverlay.trigger();
		try {
			const alreadyUploadedImages = product.images.filter(
				(img) => typeof img === "string" && img.startsWith("http"),
			);
			const newImages = product.images.filter(
				(img) => img instanceof File,
			);

			let newImageUrls = [];
			if (newImages.length > 0) {
				newImageUrls = await uploadMultipleFilesToStorage(
					newImages,
					"products",
					product.id,
				);
			}

			let sdsUrl = product.sds;
			if (product.sds instanceof File) {
				sdsUrl = await uploadSingleFileToStorage(
					product.sds,
					"products",
					product.id,
				);
			}
			const updatedProduct = {
				...product,
				images: [...alreadyUploadedImages, ...newImageUrls],
				sds: sdsUrl,
			};
			await updateProductInFirestore(updatedProduct);
			alert.showAlert("Successfully updated the product", "Success");
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const deleteProduct = async (productID) => {
		loadingOverlay.trigger();
		try {
			await deleteProductImagesFromStorage(productID);
			await deleteProductFromFirestore(productID);
			setProducts(
				fetchedProducts.filter((product) => product.id !== productID),
			);
			alert.showAlert("Product was deleted successfully", "Success");
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	return {
		fetchedProducts,
		uploadProduct,
		updateProduct,
		deleteProduct,
		refetch: fetchProducts,
	};
};

export default useProducts;
