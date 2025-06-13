import InputField from "../../../InputField/InputField";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

/**
 * InputProductPrice Component
 *
 * A reusable input component for capturing the price of a product.
 * Utilizes the shared `InputField` component.
 *
 * Props:
 * @param {Object} product - The product object in state, expected to contain a `price` property.
 * @param {Function} setProduct - Function to update the product object in state.
 *
 * Usage:
 * <InputProductPrice
 *   product={product}
 *   setProduct={setProduct}
 * />
 */
export const InputProductPrice = ({ product, setProduct, error }) => {
		
	const updatePriceVariant = (e, index) => {
		const oldVariants = [...product.variants];
		oldVariants[index].price = e.target.value;
		setProduct({ ...product, variants: oldVariants });
	};
	return (
		<section className={styles.productPriceSection}>
			{product.variants &&
				product.variants.map((variant, index) => (
					<InputField
						key={index}
						placeholder="$"
						label={`Price for size ${variant.size} ${product.sizeUnit}`}
						type="tel"
						value={variant.price}
						error={error?.[index]?.price}
						onChange={(e) =>
							updatePriceVariant(e, index)
						}
					/>
				))}
		</section>
	);
};

export const validateProductPrice = (variants) => {
	// Check for whole numbers with one decimal point
	const validPattern = /^\d+(\.\d+)?$/;

	const priceErrors = variants.map((variant) => {
		if (!variant.price || variant.price.length === 0) {
			return { price: "Product price cannot be empty" }; 
		} else if (!validPattern.test(variant.price)) {
			return { price: "Price must be a number, optionally with one decimal point" }; // ✅ fixed message
		}
		return { price: null };
	});

	const hasErrors = priceErrors.some((variant) => variant.price !== null);

	return new FormValidationResult(!hasErrors, priceErrors);
};

