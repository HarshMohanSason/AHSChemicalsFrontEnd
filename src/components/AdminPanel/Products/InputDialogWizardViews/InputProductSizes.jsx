import React from "react";
import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductSizes = ({ product, setProduct, error }) => {
	const addVariant = () => {
		const oldVariants = [...product.variants];
		oldVariants.push({ size: "", unit: "gallons", price: "", sku: "" });
		setProduct({ ...product, variants: oldVariants });
	};

	const removeVariant = (indexToRemove) => {
		setProduct((prev) => ({
			...prev,
			variants: prev.variants.filter((_, idx) => idx !== indexToRemove),
		}));
	};

	const updateSizeVariant = (e, index) => {
		const oldVariants = [...product.variants];
		oldVariants[index].size = e.target.value;
		setProduct({ ...product, variants: oldVariants });
	};

	const updateSizeUnitVariant = (e, index) => {
		const oldVariants = [...product.variants];
		oldVariants[index].unit = e.target.value;
		setProduct({ ...product, variants: oldVariants });
	};

	return (
		<section className={styles.variantSection}>
			{product.variants &&
				product.variants.map((variant, index) => (
					<React.Fragment key={index}>
						<InputField
							label={`Size ${index + 1}`}
							type="tel"
							value={variant.size}
							error={error}
							onChange={(e) => updateSizeVariant(e, index)}
						/>
						<select onChange={(e) => updateSizeUnitVariant(e, index)}>
							<option>gallons</option>
							<option>litres</option>
							<option>kilograms</option>
							<option>grams</option>
						</select>
						{index > 0 && (
							<button
								type="button"
								className={styles.removeVariantButton}
								onClick={() => removeVariant(index)}
							>
								-
							</button>
						)}
					</React.Fragment>
				))}
			<button
				type="button"
				className={styles.addVariantButton}
				onClick={addVariant}
			>
				+
			</button>
		</section>
	);
};

export const validateProductSize = (variants) => {
	const sizeErrors = [];

	for (const variant of variants) {
		if (!variant.size || variant.size.length === 0) {
			sizeErrors.push({ size: "Product size cannot be empty" });
		}

		// Pattern allows whole numbers or numbers with one decimal point
		const validPattern = /^\d+(\.\d+)?$/;
		if (!validPattern.test(variant.size)) {
			return {
				isValid: false,
				message:
					"A size can contain only one decimal point and numbers",
			};
		}
	}

	return { isValid: true };
};
