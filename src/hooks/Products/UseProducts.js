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
	const {alert} = useAlertContext();
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
	}, [alert.showAlert]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const uploadProduct = async (product) => {
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
		loadingOverlay.trigger()
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
			loadingOverlay.hide()
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
