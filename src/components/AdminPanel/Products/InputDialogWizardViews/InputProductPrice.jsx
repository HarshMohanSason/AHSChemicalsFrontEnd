import InputField from "../../../InputField/InputField";
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
	return (
		<section className={styles.inputField}>
			{product.variants &&
				product.variants.map((variant, index) => (
					<InputField
						key={index}
						label={`Price for size ${variant.size} ${variant.unit}`}
						type="tel"
						value={variant.price}
						error={error}
						onChange={(e) =>
							setProduct({
								...product,
								price: e.target.value,
							})
						}
					/>
				))}
		</section>
	);
};
