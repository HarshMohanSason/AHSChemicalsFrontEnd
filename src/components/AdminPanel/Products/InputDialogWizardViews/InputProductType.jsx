import InputField from "../../../InputField/InputField";
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
	if (input.length == 0) return "Product type cannot be empty";
	if (input.length > 30)
		return "Product type cannot be greater than 30 characters";

	// Allow only letters
	const validPattern = /^[a-zA-Z]+$/;
	if (!validPattern.test(input)) {
		return "Product type can only contain letters";
	}

	return null;
};
