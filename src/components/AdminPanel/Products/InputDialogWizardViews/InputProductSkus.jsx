import InputField from "../../../InputField/InputField"
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductSkus = ({product, setProduct, error}) => {
	
	const updateSKUVariant = (e, index) => {
		const oldVariants = [...product.variants];
		oldVariants[index].sku = e.target.value;
		setProduct({ ...product, variants: oldVariants });
	};

	return(
		<section className={styles.productSkuSection}>
			{product.variants &&
				product.variants.map((variant, index) => (
						<InputField
							key={index}
							onChange={(e) => updateSKUVariant(e, index)}
							label={`SKU for size ${variant.size} ${product.sizeUnit}`}
							type="text"
							value={variant.sku}
							error={error?.[index]?.sku}
						/>
				))}
		</section>
		)
}

export const validateProductSKU = (variants) => {
	// Allow only alphanumeric characters (letters and numbers)
	const validPattern = /^[a-zA-Z0-9]+$/;

	const skuErrors = variants.map((variant) => {
		if (!variant.sku || variant.sku.length === 0) {
			return { sku: "SKU cannot be empty" };
		} else if (!validPattern.test(variant.sku)) {
			return { sku: "SKU can only contain letters and numbers" };
		}
		return { sku: null };
	});

	const hasErrors = skuErrors.some((variant) => variant.sku !== null);
	return new FormValidationResult(!hasErrors, skuErrors);
};