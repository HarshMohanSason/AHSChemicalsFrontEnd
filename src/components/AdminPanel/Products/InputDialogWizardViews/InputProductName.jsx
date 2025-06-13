import InputField from "../../../InputField/InputField";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

/**
 * InputProductName Component
 *
 * This component renders a text input field for entering the product name.
 * It uses a reusable InputField component and displays validation errors
 * if provided through props.
 *
 * Props:
 * @params product (Object): The current product state object containing at least the `name` key.
 * @params setProduct (Function): A state setter function used to update the product object.
 * @params error (String): A specific error message for the product name field (e.g., "Product name is required"). Usually a state passed down from a parent component which calls this 
 *
 * Usage:
 * <InputProductName
 *   product={product}
 *   setProduct={setProduct}
 *   error={error}
 * />
 */
export const InputProductName = ({ product, setProduct, error}) => {
	return (
		<section className={styles.inputField}>
			<InputField
				label="Product Name"
				type="text"
				value={product.name}
				error={error}
				onChange={(e) =>
					setProduct({ ...product, name: e.target.value })
				}
			/>
		</section>
	);
};

export const validateProductName = (input) => {
	let error = null
	const validPattern = /^[a-zA-Z0-9\- ]+$/;
	if (input.length === 0)
		error =  "Product name cannot be empty";
	else if (input.length > 30)
		error = "Product length cannot be greater than 30 characters";
	// Allow only letters, numbers, spaces, and hyphens
	else if (!validPattern.test(input)) {
		error = "Product name can only contain letters, numbers, spaces, and hyphens";
	}
	return new FormValidationResult(!error, error)
}
