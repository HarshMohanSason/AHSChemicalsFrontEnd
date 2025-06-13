import React, { useState, useMemo, useRef } from "react";
import styles from "./Products.module.css";
import sharedStyles from "../AdminPanel.module.css";
import { extractFiltersFromProducts } from "../../../utils/Products/ProductsUtil";
import InputDialogWizard from "../InputDialogWizard/InputDialogWizard";
import {
	InputProductName,
	validateProductName,
} from "./InputDialogWizardViews/InputProductName";
import {
	InputProductBrandName,
	validateBrandName,
} from "./InputDialogWizardViews/InputProductBrandName";
import {
	InputProductType,
	validateProductType,
} from "./InputDialogWizardViews/InputProductType";
import {
	InputProductPrice,
	validateProductPrice,
} from "./InputDialogWizardViews/InputProductPrice";
import { useAuth } from "../../../utils/firebase/AuthContext";
import {
	InputProductSizes,
	validateProductSize,
} from "./InputDialogWizardViews/InputProductSizes";
import {
	InputProductSkus,
	validateProductSKU,
} from "./InputDialogWizardViews/InputProductSkus";
import useProducts from "../../../hooks/Products/UseProducts";
import { useAlert } from "../../../hooks/Alert/UseAlertHook";
import AlertBox from "../../AlertBox/AlertBox";
import {
	InputProductDescription,
	validateDescription,
} from "./InputDialogWizardViews/InputProductDescription";
import {
	InputProductImages,
	validateImages,
} from "./InputDialogWizardViews/InputProductImages";
import {
	InputProductSDS,
	validatePDF,
} from "./InputDialogWizardViews/InputProductSDS";
import {
	InputProductTags,
	validateTags,
} from "./InputDialogWizardViews/InputProductTags";
import ProductTileButton from "./ProductTileButton";
import ConfirmAlertBox from "../../AlertBox/ConfirmationAlertBox";
import { useConfirmationAlert } from "../../../hooks/Alert/UseAlertHook";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import useLoadingOverlay from "../../../hooks/LoadingOverlay/LoadingOverlayHook";

const Products = ({
	hideAddProductSection = false,
	productTileButtonText = "Edit",
}) => {
	const { isAlertOpen, alertType, showAlert, alertMessage, alertId } =
		useAlert();
	const {
		isConfirmationOpen,
		confirmationTitle,
		confirmationFunc,
		confirmationId,
		confirmationText,
		confirmButtonColor,
		confirmButtonText,
		showConfirmationAlert,
	} = useConfirmationAlert();
	const { showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay } =
		useLoadingOverlay();
	const {
		fetchedProducts,
		fetchProductsLoading,
		deleteProduct,
		updateProduct,
		productDialogLoading,
		uploadProduct,
		refetch,
	} = useProducts(showAlert, triggerLoadingOverlay, hideLoadingOverlay);
	const filters = extractFiltersFromProducts(fetchedProducts);
	const { user } = useAuth();
	const defaultProduct = {
		id: crypto.randomUUID(),
		name: "",
		brand: "",
		type: "",
		sizeUnit: "gallons",
		variants: [{ size: "", price: "", sku: "" }],
		description: "",
		images: [""],
		sds: null,
		tags: [""],
	};
	const [product, setProduct] = useState(defaultProduct);

	const inputDialogWizardRef = useRef(null);
	const [currentView, setCurrentView] = useState(0);
	const [selectedFilters, setSelectedFilters] = useState({
		filters,
	});

	const toggleFilter = (category, value) => {
		setSelectedFilters((prev) => {
			const currentValues = prev[category] || [];
			const updatedValues = currentValues.includes(value)
				? currentValues.filter((v) => v !== value)
				: [...currentValues, value];

			return {
				...prev,
				[category]: updatedValues,
			};
		});
	};

	const filteredProducts = useMemo(() => {
		return fetchedProducts.filter((product) => {
			return Object.entries(selectedFilters).every(
				([category, values]) => {
					if (values.length === 0) return true;
					if (category === "Brand")
						return values.includes(product.brand);
					if (category === "Type")
						return values.includes(product.type);
					return true;
				},
			);
		});
	}, [fetchedProducts, selectedFilters]);

	const [dialogFunction, setDialogFunction] = useState(null);
	//Each step has its own error state
	const [wizardStepErrors, setWizardStepErrors] = useState(
		Array(10).fill(null),
	);
	const triggerWizardStepError = (error, index) => {
		const oldErrors = [...wizardStepErrors];
		oldErrors[index] = error;
		setWizardStepErrors(oldErrors);
	};

	const wizardSteps = [
		{
			step: "Name",
			view: (
				<InputProductName
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[0]}
				/>
			),
			validate: () => validateProductName(product.name),
		},
		{
			step: "Brand",
			view: (
				<InputProductBrandName
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[1]}
				/>
			),
			validate: () => validateBrandName(product.brand),
		},
		{
			step: "Type",
			view: (
				<InputProductType
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[2]}
				/>
			),
			validate: () => validateProductType(product.type),
		},
		{
			step: "Sizes",
			view: (
				<InputProductSizes
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[3]}
				/>
			),
			validate: () => validateProductSize(product.variants),
		},
		{
			step: "Price",
			view: (
				<InputProductPrice
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[4]}
				/>
			),
			validate: () => validateProductPrice(product.variants),
		},
		{
			step: "Skus",
			view: (
				<InputProductSkus
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[5]}
				/>
			),
			validate: () => validateProductSKU(product.variants),
		},
		{
			step: "Description",
			view: (
				<InputProductDescription
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[6]}
				/>
			),
			validate: () => validateDescription(product.description),
		},
		{
			step: "Images",
			view: (
				<InputProductImages product={product} setProduct={setProduct} />
			),
			validate: () => validateImages(product.images, showAlert),
		},
		{
			step: "SDS",
			view: <InputProductSDS product={product} setProduct={setProduct} />,
			validate: () => validatePDF(product.sds, showAlert),
		},
		{
			step: "Tags",
			view: (
				<InputProductTags
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[9]}
				/>
			),
			validate: () => validateTags(product.tags),
		},
	];

	return (
		<section className={styles.adminProductsDisplaySection}>
			{/* Products display section*/}
			<section className={styles.productsDisplaySection}>
				{/* Filters Section */}
				<section className={styles.filterSection}>
					{Object.entries(filters).map(([filterCategory, values]) => (
						<div className={styles.filterType} key={filterCategory}>
							<h4 className={styles.filterHeading}>
								{filterCategory}
							</h4>
							<ul className={styles.filterInputList}>
								{values.map((value, index) => (
									<li key={index}>
										<label className={styles.filterInput}>
											<input
												type="checkbox"
												onChange={() =>
													toggleFilter(
														filterCategory,
														value,
													)
												}
											/>
											<span
												className={
													styles.filterInputLabelText
												}
											>
												{value}
											</span>
										</label>
									</li>
								))}
							</ul>
						</div>
					))}
				</section>
				{/* Products Section*/}
				<section className={styles.productsSection}>
					<div className={styles.productList}>
						{filteredProducts &&
							filteredProducts.map((product, index) => {
								return (
									<div
										className={styles.productTile}
										key={index}
									>
										<div
											className={styles.productImageTile}
										>
											<img src={product.images[0]} />
											{user?.isAdmin &&
											!hideAddProductSection ? (
												<ProductTileButton
													onDelete={() =>
														showConfirmationAlert(
															"Delete Product?",
															`Are you sure you want to delete the product ${product.name}?`,
															() =>
																deleteProduct(
																	product.id,
																),
															"Delete",
															"red",
														)
													}
													onEdit={() => {
														setProduct(product);
														setDialogFunction(
															() => (latestProduct) => {
																updateProduct(
																	latestProduct,
																);
															},
														);
														setCurrentView(0);
														inputDialogWizardRef.current.showModal();
													}}
												/>
											) : (
												<button>Add</button>
											)}
										</div>
										<h2>{product.name}</h2>
									</div>
								);
							})}
					</div>
				</section>
			</section>
			{/* Add a product tile */}
			{user?.isAdmin && !hideAddProductSection && (
				<section className={sharedStyles.addDataTile}>
					<p>Add a new product</p>
					<button
						onClick={() => {
							setCurrentView(0);
							setDialogFunction(() => (latestProduct) => {
								uploadProduct(latestProduct);
							});
							setProduct(defaultProduct);
							inputDialogWizardRef.current.showModal();
						}}
					>
						+
					</button>
				</section>
			)}
			{/* Dialog box to open when product is added or edited*/}
			<InputDialogWizard
				dialogRef={inputDialogWizardRef}
				steps={wizardSteps}
				setStepError={triggerWizardStepError}
				handleSubmit={() => dialogFunction(product)}
				currentView={currentView}
				setCurrentView={setCurrentView}
				isLoading={productDialogLoading}
			/>
			<AlertBox
				key={alertId}
				message={alertMessage}
				isOpen={isAlertOpen}
				type={alertType}
			/>
			<ConfirmAlertBox
				key={confirmationId}
				isOpen={isConfirmationOpen}
				confirmationTitle={confirmationTitle}
				confirmationFunc={confirmationFunc}
				confirmationText={confirmationText}
				confirmButtonColor={confirmButtonColor}
				confirmButtonText={confirmButtonText}
			/>
			<LoadingOverlay showOverlay={showLoadingOverlay} />
		</section>
	);
};

export default Products;
