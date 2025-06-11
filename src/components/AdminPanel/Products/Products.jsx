import React, { useState, useMemo, useRef } from "react";
import styles from "./Products.module.css";
import sharedStyles from "../AdminPanel.module.css";
import useFetchProducts from "../../../hooks/Products/UseFetchProducts";
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
import { InputProductPrice } from "./InputDialogWizardViews/InputProductPrice";
import { useAuth } from "../../../utils/firebase/AuthContext";
import {
	InputProductSizes,
	validateProductSize,
} from "./InputDialogWizardViews/InputProductSizes";
import { InputProductSkus } from "./InputDialogWizardViews/InputProductSkus";

const Products = ({
	hideAddProductSection = false,
	productTileButtonText = "Edit",
}) => {
	const { products, loading, error, refetch } = useFetchProducts();
	const filters = extractFiltersFromProducts(products);
	const { user } = useAuth();
	const inputDialogWizardRef = useRef(null);
	const [viewProductData, setViewProductData] = useState({
		name: "",
		brandName: "",
		type: "",
		variants: [
			{size: "", unit: "gallons", price: "", sku: ""}
		],
	});

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
		return products.filter((product) => {
			return Object.entries(selectedFilters).every(
				([category, values]) => {
					if (values.length === 0) return true;
					if (category === "Brand")
						return values.includes(product.brandName);
					if (category === "Type")
						return values.includes(product.type);
					return true;
				},
			);
		});
	}, [products, selectedFilters]);

	//Each step has its own error state
	const [wizardStepErrors, setWizardStepErrors] = useState(
		Array(8).fill(null),
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
					product={viewProductData}
					setProduct={setViewProductData}
					error={wizardStepErrors[0]}
				/>
			),
			validate: () => {
				const error = validateProductName(viewProductData.name);
				return error
					? { isValid: false, message: error }
					: { isValid: true };
			},
		},
		{
			step: "Brand",
			view: (
				<InputProductBrandName
					product={viewProductData}
					setProduct={setViewProductData}
					error={wizardStepErrors[1]}
				/>
			),
			validate: () => {
				const error = validateBrandName(viewProductData.brandName);
				return error
					? { isValid: false, message: error }
					: { isValid: true };
			},
		},
		{
			step: "Type",
			view: (
				<InputProductType
					product={viewProductData}
					setProduct={setViewProductData}
					error={wizardStepErrors[2]}
				/>
			),
			validate: () => {
				const error = validateProductType(viewProductData.type);
				return error
					? { isValid: false, message: error }
					: { isValid: true };
			},
		},
		{
			step: "Sizes",
			view: (
				<InputProductSizes
					product={viewProductData}
					setProduct={setViewProductData}
					error={wizardStepErrors[3]}
				/>
			),
			validate: () => validateProductSize(viewProductData.variants),
		},
		{
			step: "Price",
			view: (
				<InputProductPrice
					product={viewProductData}
					setProduct={setViewProductData}
					error={wizardStepErrors[4]}
				/>
			),
			validator: null,
		},
		{
			step: "Skus",
			view: (
				<InputProductSkus
					product={viewProductData}
					setProduct={setViewProductData}
					error={wizardStepErrors[5]}
				/>
			),
			validate: null,
		}
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
								{values.map((value) => (
									<li key={value}>
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
											<button>
												{productTileButtonText}
											</button>
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
						onClick={() => inputDialogWizardRef.current.showModal()}
					>
						+
					</button>
				</section>
			)}
			{/* Dialog box to open when product is added or edited*/}
			<InputDialogWizard
				dialogRef={inputDialogWizardRef}
				steps={wizardSteps}
				stepError={triggerWizardStepError}
			/>
		</section>
	);
};

export default Products;
