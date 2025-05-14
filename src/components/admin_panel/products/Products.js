import React, { useState, useRef } from "react";
import "../../../styles/components/admin_panel/products/Products.css";
import InputFormDialog from "../input_dialog_views/InputFormDialog";
import ProductInfoView from "../input_dialog_views/ProductInfoView";
import ProductSizesView from "../input_dialog_views/ProductSizesView";
import ProductSkuView from "../input_dialog_views/ProductSkuView";
import ProductDescView from "../input_dialog_views/ProductDescView";
import ProductImageAndSDSView from "../input_dialog_views/ProductImageAndSDSView";
import {
	handleFirebaseError,
	uploadMultipleFilesToStorage,
	uploadSingleFileToStorage,
	uploadJsonToFirestore,
} from "../../../utils/firebase/firebase_utility";
import useAlert from "../../../hooks/UseAlertHook";
import useLoadingOverlay from "../../../hooks/LoadingOverlayHook";
import { AlertBox } from "../../AlertBox";
import { ProductsTagsView } from "../input_dialog_views/ProductTagsView";
import { ProductsFilterAndTileSection } from "./ProductsFilterAndTileSection";

function Products() {
	const dialogRef = useRef(null);
	
	const { showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay } =
		useLoadingOverlay();
	const { isAlertOpen, alertType, errorMessage, showAlert, closeAlert } =
		useAlert();
	const [products, setProducts] = useState([]);
	const [productData, setProductData] = useState({
		brandName: "",
		name: "",
		type: "",
		sizes: [""],
		sizeUnit: "gallons",
		skus: [],
		description: "",
		images: [null],
		sds: null,
		tags: [""],
	});
	const views = [
		<ProductInfoView
			productData={productData}
			setProductData={setProductData}
		/>,
		<ProductSizesView
			productData={productData}
			setProductData={setProductData}
		/>,
		<ProductSkuView
			productData={productData}
			setProductData={setProductData}
		/>,
		<ProductDescView
			productData={productData}
			setProductData={setProductData}
		/>,
		<ProductImageAndSDSView
			productData={productData}
			setProductData={setProductData}
		/>,
		<ProductsTagsView
			productData={productData}
			setProductData={setProductData}
		/>,
	];
	const startUploadingProduct = async (e) => {
		e.preventDefault();
		triggerLoadingOverlay();
		try {
			const filesUrls = await uploadMultipleFilesToStorage(
				productData.images,
				"products",
				productData.name,
			);
			const sdsUrl = await uploadSingleFileToStorage(
				productData.sds,
				"products",
				productData.name,
			);
			const finalProductData = {
				...productData,
				images: filesUrls,
				sds: sdsUrl,
			};
			await uploadJsonToFirestore("products", finalProductData);
			showAlert("Product was uploaded successfully!", "Success");
			dialogRef.current.close(); 
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			hideLoadingOverlay();
		}
	};
	return (
		<section className="products-section">
			<AlertBox
				type={alertType}
				message={errorMessage}
				isOpen={isAlertOpen}
				isClose={closeAlert}
			/>
			<ProductsFilterAndTileSection />
			<section className="add-a-product-section">
				<h3>Add a product</h3>
				<button
					onClick={() => {
						dialogRef.current.showModal();
					}}
				>
					+
				</button>
			</section>
			<InputFormDialog
					title="Add a product"
					dialogRef={dialogRef}
					views={views}
					showLoadingOverlay={showLoadingOverlay}
					submitFunc={startUploadingProduct}
			/>
		</section>
	);
}

export default Products;
