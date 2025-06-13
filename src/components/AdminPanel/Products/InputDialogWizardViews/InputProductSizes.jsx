import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import InputField from "../../../InputField/InputField";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

export const InputProductSizes = ({ product, setProduct, error }) => {
	const addVariant = () => {
		const oldVariants = [...product.variants];
		oldVariants.push({ size: "", price: "", sku: "" });
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
		<section className={styles.sizeInputSection}>
			{product.variants &&
				product.variants.map((variant, index) => (
					<div className={styles.sizeInputList} key={index}>
						<div className={styles.sizeInputFieldDiv}>
							<InputField
								label={`Size ${index + 1}`}
								type="tel"
								value={variant.size}
								error={error?.[index]?.size}
								onChange={(e) => updateSizeVariant(e, index)}
							/>
							{index > 0 && (
								<button type="button" style={{marginTop: "50px", width: "40px", cursor: "pointer"}}onClick={() => removeVariant(index)}><FontAwesomeIcon icon={faTrashCan} /></button>	
								
							)}
						</div>
					</div>
				))}
			<div className={styles.sizeUnitSelectDiv}>
				<select
					onChange={(e) =>{
						setProduct({ ...product, sizeUnit: e.target.value })
					}}
				>
					<option>gallons</option>
					<option>litres</option>
					<option>kilograms</option>
					<option>grams</option>
				</select>
				<button
					type="button"
					style={{borderRadius: "50%", border: "none", height: "30px", width: "30px", cursor: "pointer"}}
					onClick={addVariant}
				>
					+
				</button>
			</div>
		</section>
	);
};

export const validateProductSize = (variants) => {
	// Check for whole numbers with one decimal point
	const validPattern = /^\d+(\.\d+)?$/;
	const sizeErrors = variants.map((variant) => {
		if (!variant.size || variant.size.length === 0) {
			return { size: "Product size cannot be empty" };
		} else if (!validPattern.test(variant.size)) {
			return {
				size: "A size can contain only one decimal point and numbers",
			};
		}
		return { size: null };
	});

	const hasErrors = sizeErrors.some((variant) => variant.size !== null);

	return new FormValidationResult(!hasErrors, sizeErrors);
};
