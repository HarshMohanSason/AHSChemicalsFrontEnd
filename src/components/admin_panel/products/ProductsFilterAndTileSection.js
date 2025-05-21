import { useEffect, useState, useRef } from "react";
import {
	fetchParentCollectionDataFromFirestore,
	handleFirebaseError,
	updateJsonToFirestore,
	uploadMultipleFilesToStorage,
	uploadSingleFileToStorage,
} from "../../../utils/firebase/firebase_utility";
import { ProductsSkeletonLoader } from "./ProductsSkeletonLoader";
import useAlert from "../../../hooks/UseAlertHook";
import DOMPurify from "dompurify";
import InputFormDialog from "../input_dialog_views/InputFormDialog";
import ProductInfoView from "../input_dialog_views/ProductInfoView";
import ProductSizesView from "../input_dialog_views/ProductSizesView";
import ProductSkuView from "../input_dialog_views/ProductSkuView";
import ProductDescView from "../input_dialog_views/ProductDescView";
import ProductImageAndSDSView from "../input_dialog_views/ProductImageAndSDSView";
import ProductsTagsView from "../input_dialog_views/ProductTagsView";
import useLoadingOverlay from "../../../hooks/LoadingOverlayHook";
import { AlertBox } from "../.././AlertBox";

export const ProductsFilterAndTileSection = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [showSkeletonLoader, setSkeletonLoader] = useState(false);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);

	const { showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay } =
		useLoadingOverlay();
	const { isAlertOpen, alertType, errorMessage, showAlert, closeAlert } =
		useAlert();
	const editFormDialogRef = useRef(null);

	//Whenever the edit button is clicked, this keeps track of which product is being edited to pass it down to the views
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

	const fetchProducts = async () => {
		setSkeletonLoader(true);
		try {
			const getProducts =
				await fetchParentCollectionDataFromFirestore("products");

			setProducts(getProducts);
		} catch (error) {
			showAlert(handleFirebaseError(error), "Error");
		} finally {
			setSkeletonLoader(false);
		}
	};

	const updateProduct = async (event) => {
		event.preventDefault();
		triggerLoadingOverlay();

		try {
			if (currentProduct.id != null) {
				let updatedProduct = { ...currentProduct };

				const imagesWithFileType = currentProduct.images.filter(
					(image) => image instanceof File,
				);

				if (imagesWithFileType.length > 0) {
					const imageUrls = await uploadMultipleFilesToStorage(
						imagesWithFileType,
						"products",
						currentProduct.name,
					);
					updatedProduct.images = [
						...currentProduct.images.filter(
							(img) => img instanceof String,
						),
						...imageUrls,
					];
				}

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
				await updateJsonToFirestore("products", updatedProduct);
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

	const handleBrandChange = (brand) => {
		setSelectedBrands((prev) =>
			prev.includes(brand)
				? prev.filter((b) => b !== brand)
				: [...prev, brand],
		);
	};

	const handleTypeChange = (type) => {
		setSelectedTypes((prev) =>
			prev.includes(type)
				? prev.filter((t) => t !== type)
				: [...prev, type],
		);
	};

	const filterProducts = () => {
		const filteredProducts = products.filter((product) => {
			const matchesBrand =
				selectedBrands.length === 0 ||
				selectedBrands.includes(product.brandName?.toLowerCase());
			const matchesType =
				selectedTypes.length === 0 ||
				selectedTypes.includes(product.type?.toLowerCase());
			return matchesBrand && matchesType;
		});
		setFilteredProducts(filteredProducts);
	};

	//Called once initially when the products load
	useEffect(() => {
		fetchProducts();
	}, []);

	//Trigger refresh whenever a filter is applied
	useEffect(() => {
		filterProducts();
	}, [selectedBrands, selectedTypes, products]);

	const brands = [
		...new Set(
			products
				.map((p) => p.brandName?.trim().toLowerCase()),
		),
	];

	const types = [
		...new Set(
			products.map((p) => p.type?.trim().toLowerCase()),
		),
	];

	const handleProductEdit = (product) => {
		setCurrentProduct(product);
		editFormDialogRef.current.showModal();
	};

	return (
		<>
			{showSkeletonLoader && <ProductsSkeletonLoader />}
			<AlertBox
				type={alertType}
				message={errorMessage}
				isOpen={isAlertOpen}
				isClose={closeAlert}
			/>
			<section
				className="filters-and-product-display-section"
				style={{ display: products.length !== 0 ? 'flex' : "none" }}
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
										onClick={() =>
											handleProductEdit(product)
										}
									>
										Edit
									</button>
								</div>
								<h2>{product.name}</h2>

								<p
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											product.description,
										),
									}}
								/>
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
