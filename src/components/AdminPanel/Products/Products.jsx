import React, { useState, useMemo, useRef } from "react";
import styles from "./Products.module.css";
import sharedStyles from "../AdminPanel.module.css";
import InputDialogWizard from "../InputDialogWizard/InputDialogWizard";
import useProducts from "../../../hooks/Products/UseProducts";
import { InputProductDescription } from "./InputDialogWizardViews/InputProductDescription";
import { InputProductImages } from "./InputDialogWizardViews/InputProductImages";
import { InputProductSDS } from "./InputDialogWizardViews/InputProductSDS";
import { InputProductTags } from "./InputDialogWizardViews/InputProductTags";
import ProductTileButton from "./ProductTileButton";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../contexts/AlertBoxContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useFiltersContext } from "../../../contexts/FiltersContext";
import { toTitleCase } from "../../../utils/StringUtils";
import { InputProductBasicInfo } from "./InputDialogWizardViews/InputProductBasicInfo";
import { InputProductInventoryDetails } from "./InputDialogWizardViews/InputProductInventoryDetals";

const Products = ({ hideAddProductSection = false }) => {
	const navigate = useNavigate();
	const { confirmationAlert } = useAlertContext();
	const filters = useFiltersContext();

	const { fetchedProducts, deleteProduct, updateProduct, uploadProduct } =
		useProducts();
	const { user } = useAuth();
	const defaultProduct = {
		id: crypto.randomUUID(),
		name: "",
		brand: "PRO BLEND",
		type: "LAUNDRY",
		hazard_type: "HAZARDOUS",
		sizeUnit: "GALLONS",
		variants: [
			{
				inventory: "",
				size: "",
				price: "",
				sku: "",
				status: "OUT OF STOCK",
			},
		],
		description: "",
		images: [""],
		sds: null,
		tags: [""],
	};
	const [product, setProduct] = useState(defaultProduct);

	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedTypes, setSelectedTypes] = useState([]);

	const filteredProducts = useMemo(() => {
		return fetchedProducts.filter((product) => {
			const matchesBrand =
				selectedBrands.length === 0 ||
				selectedBrands.includes(product.brand);
			const matchesType =
				selectedTypes.length === 0 ||
				selectedTypes.includes(product.type);
			return matchesBrand && matchesType;
		});
	}, [fetchedProducts, selectedBrands, selectedTypes]);

	const toggleBrand = (brand) => {
		setSelectedBrands((prev) =>
			prev.includes(brand)
				? prev.filter((b) => b !== brand)
				: [...prev, brand],
		);
	};

	const toggleType = (type) => {
		setSelectedTypes((prev) =>
			prev.includes(type)
				? prev.filter((t) => t !== type)
				: [...prev, type],
		);
	};

	const inputDialogWizardRef = useRef(null);
	const [currentView, setCurrentView] = useState(0);

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
			step: "Basic Info",
			view: (
				<InputProductBasicInfo
					product={product}
					setProduct={setProduct}
				/>
			),
		},
		{
			step: "Inventory Details",
			view: (
				<InputProductInventoryDetails
					product={product}
					setProduct={setProduct}
					error={wizardStepErrors[3]}
				/>
			),
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
		},
		{
			step: "Images",
			view: (
				<InputProductImages product={product} setProduct={setProduct} />
			),
		},
		{
			step: "SDS",
			view: <InputProductSDS product={product} setProduct={setProduct} />,
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
		},
	];

	return (
		<section className={styles.adminProductsDisplaySection}>
			{/* Products display section*/}
			<section className={styles.productsDisplaySection}>
				{/* Filters Section */}
				<section className={styles.filterSection}>
					{/* Brands */}
					<div className={styles.filterType}>
						<h4 className={styles.filterHeading}>Brands</h4>
						<ul className={styles.filterInputList}>
							{filters.brands.map((brand) => (
								<li key={brand.id}>
									<label className={styles.filterInput}>
										<input
											type="checkbox"
											checked={selectedBrands.includes(
												brand.name,
											)}
											onChange={() =>
												toggleBrand(brand.name)
											}
										/>
										<span
											className={
												styles.filterInputLabelText
											}
										>
											{toTitleCase(brand.name)}
										</span>
									</label>
								</li>
							))}
						</ul>
					</div>

					{/* Types */}
					<div className={styles.filterType}>
						<h4 className={styles.filterHeading}>Types</h4>
						<ul className={styles.filterInputList}>
							{filters.types.map((type) => (
								<li key={type.id}>
									<label className={styles.filterInput}>
										<input
											type="checkbox"
											checked={selectedTypes.includes(
												type.name,
											)}
											onChange={() =>
												toggleType(type.name)
											}
										/>
										<span
											className={
												styles.filterInputLabelText
											}
										>
											{toTitleCase(type.name)}
										</span>
									</label>
								</li>
							))}
						</ul>
					</div>
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
										onClick={(e) => {
											e.stopPropagation();
											navigate(
												`/products/${product.id}`,
												{ state: { product } },
											);
										}}
									>
										<div
											className={styles.productImageTile}
										>
											<img src={product.images[0]} />
											{user?.isAdmin &&
												!hideAddProductSection && (
													<ProductTileButton
														onDelete={() =>
															confirmationAlert.showAlert(
																"Delete Product?",
																`Are you sure you want to delete the product $
																{product.name}?`,
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
																() =>
																	(
																		latestProduct,
																	) => {
																		updateProduct(
																			latestProduct,
																		);
																	},
															);
															setCurrentView(0);
															inputDialogWizardRef.current.showModal();
														}}
													/>
												)}
										</div>
										<h2>{toTitleCase(product.name)}</h2>
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
			/>
		</section>
	);
};

export default Products;
