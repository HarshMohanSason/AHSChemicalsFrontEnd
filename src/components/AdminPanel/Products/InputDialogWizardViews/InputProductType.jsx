import InputField from "../../../InputField/InputField";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductType = ({ product, setProduct, error }) => {
	return (
		<section className={styles.inputField}>
			<InputField
				label="Product Type"
				type="text"
				value={product.type}
				error={error}
				onChange={(e) =>
					setProduct({
						...product,
						type: e.target.value,
					})
				}
			/>
		</section>
	);
};

export const validateProductType = (input) => {
	let error = null;
	const validPattern = /^[a-zA-Z]+$/;

	if (input.length === 0) {
		error = "Product type cannot be empty";
	} else if (input.length > 30)
		error = "Product type cannot be greater than 30 characters";
	// Allow only letters
	else if (!validPattern.test(input)) {
		error = "Product type can only contain letters";
	}

	return new FormValidationResult(!error, error);
};
