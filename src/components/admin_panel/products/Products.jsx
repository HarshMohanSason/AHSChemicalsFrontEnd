import React, { useState, useRef } from "react";
import "../../../styles/components/admin_panel/products/Products.css";
import InputFormDialog from "../InputFormDialog";
import ProductInfoView from "./ProductInfoView";
import ProductSizesView from "./ProductSizesView";
import ProductSkuView from "./ProductSkuView";
import ProductDescView from "./ProductDescView";
import ProductImageAndSDSView from "./ProductImageAndSDSView";
import ProductsTagsView from "./ProductTagsView";
import {
	handleFirebaseError, 
	uploadMultipleFilesToStorage,
	uploadSingleFileToStorage,
	uploadProductToFirestore,
} from "../../../utils/firebase/firebase_utility";
import useAlert from "../../../hooks/UseAlertHook";
import useLoadingOverlay from "../../../hooks/LoadingOverlayHook";
import AlertBox from "../../AlertBox";
import ProductsFilterAndTileSection from "./ProductsFilterAndTileSection"

const Products = () => {
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
				id: crypto.randomUUID(),
				images: filesUrls,
				sds: sdsUrl,
			};
			await uploadProductToFirestore(finalProductData);
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
				<h3>Add a new product</h3>
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
