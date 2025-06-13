import InputField from "../../../InputField/InputField";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

/**
 * InputProductBrandName Component
 *
 * A reusable input component for capturing the brand name of a product.
 * Utilizes the shared `InputField` component and allows error messages to be passed in for validation feedback.
 *
 * Props:
 * @param {Object} product - The product object in state, expected to contain a `brandName` property.
 * @param {Function} setProduct - Function to update the product object in state.
 * @param {string} error - Optional error message for brand name validation.
 *
 * Usage:
 * <InputProductBrandName
 *   product={product}
 *   setProduct={setProduct}
 *   error={error}
 * />
 */
export const InputProductBrandName = ({product, setProduct, error}) => {
	return (
		<section className={styles.inputField}>
			<InputField
				label="Brand Name"
				type="text"
				value={product.brand}
				error={error}
				onChange={(e) =>
					setProduct({ ...product, brand: e.target.value })
				}
			/>
		</section>
	);
};

export const validateBrandName = (input) => {
	let error = null;
	const validPattern = /^[a-zA-Z\- ]+$/;
	if (input.length === 0){
		error =  "Brand name cannot be empty";
	}
	else if (input.length > 30){
		error = "Brand name length cannot be greater than 30 characters";
	}
	// Allow only letters, spaces, and hyphens
	else if (!validPattern.test(input)) {
		error = "Product brand name can only contain letters, spaces, and hyphens";
	}
	return new FormValidationResult(!error, error)
}
