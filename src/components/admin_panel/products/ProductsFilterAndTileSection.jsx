import { useEffect, useState, useRef } from "react";
import {
	fetchProductsFromFirestore,
	handleFirebaseError,
	updateProductInFirestore,
	uploadMultipleFilesToStorage,
	uploadSingleFileToStorage,
} from "../../../utils/firebase/firebase_utility";
import { ProductsSkeletonLoader } from "./ProductsSkeletonLoader";
import useAlert from "../../../hooks/UseAlertHook";
import DOMPurify from "dompurify";
import InputFormDialog from "../InputFormDialog";
import ProductInfoView from "./ProductInfoView";
import ProductSizesView from "./ProductSizesView";
import ProductSkuView from "./ProductSkuView";
import ProductDescView from "./ProductDescView";
import ProductImageAndSDSView from "./ProductImageAndSDSView";
import ProductsTagsView from "./ProductTagsView";
import useLoadingOverlay from "../../../hooks/LoadingOverlayHook";
import AlertBox from "../.././AlertBox";
import { useProducts } from "../../../hooks/ProductsHook";

const ProductsFilterAndTileSection = () => {
	const { showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay } =
		useLoadingOverlay();
	const { isAlertOpen, alertType, errorMessage, showAlert, closeAlert } =
		useAlert();
	const {
		filteredProducts,
		loading,
		error,
		fetchProducts,
		handleBrandChange,
		handleTypeChange,
		brands,
		types,
	} = useProducts();

	useEffect(() => {
		if (error) {
			showAlert(errorMessage, "Error");
		}
	}, [error, errorMessage]);

	//To track the current product which is being edited
	const [currentProduct, setCurrentProduct] = useState({
		brandName: "",
		name: "",
		type: "",
		images: [null],
		sizes: [""],
		skus: [""],
		sds: null,
		tags: [""],
	});

	const editFormDialogRef = useRef(null);

	const views = [
		<ProductInfoView
			productData={currentProduct}
			setProductData={setCurrentProduct}
		/>,
		<ProductSizesView
			productData={currentProduct}
			setProductData={setCurrentProduct}
		/>,
		<ProductSkuView
			productData={currentProduct}
			setProductData={setCurrentProduct}
		/>,
		<ProductDescView
			productData={currentProduct}
			setProductData={setCurrentProduct}
		/>,
		<ProductImageAndSDSView
			productData={currentProduct}
			setProductData={setCurrentProduct}
		/>,
		<ProductsTagsView
			productData={currentProduct}
			setProductData={setCurrentProduct}
		/>,
	];

	const updateProduct = async (event) => {
		event.preventDefault();
		triggerLoadingOverlay();

		try {
			if (currentProduct.id != null) {
				let updatedProduct = { ...currentProduct };

				//Only get the images which are updated
				const imagesWithFileType = currentProduct.images.filter(
					(image) => image instanceof File,
				);

				//update the images to storage and get url
				if (imagesWithFileType.length > 0) {
					const imageUrls = await uploadMultipleFilesToStorage(
						imagesWithFileType,
						"products",
						currentProduct.name,
					);
					updatedProduct.images = [
						//separate the not changed images. 
						...currentProduct.images.filter(
							(img) => img instanceof String,
						),
						...imageUrls, //add the uploaded url
					];
				}

				//Change the sds file for the product 
				if (currentProduct.sds instanceof File) {
					const sdsUrl = await uploadSingleFileToStorage(
						currentProduct.sds,
						"products",
						currentProduct.name,
					);
					updatedProduct.sds = sdsUrl;
				}

				// Update the state once
				setCurrentProduct(updatedProduct);

				// Upload to Firestore using the updated version
				await updateProductInFirestore("products", updatedProduct);
			}
			editFormDialogRef.current.close();
			showAlert("Succesfully updated the product", "Success");
			setTimeout(() => fetchProducts(), 200); //Fetch the products again to reset the state
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			hideLoadingOverlay();
		}
	};

	return (
		<>
			{loading && <ProductsSkeletonLoader />}
			<AlertBox
				type={alertType}
				message={errorMessage}
				isOpen={isAlertOpen}
				isClose={closeAlert}
			/>
			<section
				className="filters-and-product-display-section"
				style={{
					display: filteredProducts.length !== 0 ? "flex" : "none",
				}}
			>
				<section className="filters-section">
					<h1>Filters</h1>
					<fieldset className="filters-fieldset">
						<legend>Brands</legend>
						{brands.map((brand, index) => {
							return (
								<label key={brand}>
									<input
										type="checkbox"
										onChange={() =>
											handleBrandChange(brand)
										}
									/>
									{brand}
								</label>
							);
						})}
					</fieldset>
					<fieldset className="filters-fieldset">
						<legend>Product Types</legend>
						{types.map((type, index) => {
							return (
								<label key={index}>
									<input
										type="checkbox"
										onChange={() => handleTypeChange(type)}
									/>
									{type}
								</label>
							);
						})}
					</fieldset>
				</section>
				<section className="products-display-section">
					{filteredProducts.map((product, index) => {
						return (
							<div className="product-tile" key={index}>
								<div className="image-wrapper">
									<img
										src={product.images[0]}
										alt="product-image"
									/>
									<button
										onClick={() => {
											setCurrentProduct(product);
											editFormDialogRef.current.showModal();
										}}
									>
										Edit
									</button>
								</div>
								<h2>{product.name}</h2>
							</div>
						);
					})}
				</section>
			</section>
			<InputFormDialog
				title={"Edit the product"}
				dialogRef={editFormDialogRef}
				views={views}
				showLoadingOverlay={showLoadingOverlay}
				submitFunc={updateProduct}
			/>
		</>
	);
};

export default ProductsFilterAndTileSection;
