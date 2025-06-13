import { useCallback, useEffect, useState } from "react";
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

const useProducts = (showAlert, triggerLoadingOverlay, hideLoadingOverlay) => {
	const [fetchedProducts, setProducts] = useState([]);
	const [fetchProductsLoading, setFetchProductsLoading] = useState(false);
	const [productDialogLoading, setProductDialogLoading] = useState(false);
	const [productDeleteLoading, setProductDeleteLoading] = useState(false);

	const fetchProducts = useCallback(async () => {
		setFetchProductsLoading(true);
		try {
			const getProducts = await fetchProductsFromFirestore();
			if (getProducts.length !== 0) {
				setProducts(getProducts);
			}
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			setFetchProductsLoading(true);
		}
	}, [showAlert]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const uploadProduct = async (product) => {
		setProductDialogLoading(true);
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
			showAlert("Successfully uploaded the product.", "Success");
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			setProductDialogLoading(false);
		}
	};

	const updateProduct = async (product) => {
		setProductDialogLoading(true);
		try {
			console.log(product);
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
			showAlert("Successfully updated the product", "Success");
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			setProductDialogLoading(false);
		}
	};

	const deleteProduct = async (productID) => {
		triggerLoadingOverlay();
		try {
			await deleteProductImagesFromStorage(productID);
			await deleteProductFromFirestore(productID);
			setProducts(
				fetchedProducts.filter((product) => product.id !== productID),
			);
			showAlert("Product was deleted successfully", "Success");
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			hideLoadingOverlay();
		}
	};

	return {
		fetchedProducts,
		fetchProductsLoading,
		uploadProduct,
		updateProduct,
		productDialogLoading,
		deleteProduct,
		refetch: fetchProducts,
	};
};

export default useProducts;
