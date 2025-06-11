import InputField from "../../../InputField/InputField";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountPropertyNames = ({ user, setUser, error }) => {
	
	const addProperty = () => {
		const oldProperties = [...user.properties];
		oldProperties.push("");
		setUser({ ...user, properties: oldProperties });
	};

	const removeProperty = (index) =>
		setUser({
			...user,
			properties: user.properties.filter((_, idx) => idx !== index),
		});

	const updatePropertyName = (event, index) => {
		const oldProperties = [...user.properties];
		oldProperties[index] = event.target.value;
		setUser({ ...user, properties: oldProperties });
	};

	return (
		<section className={styles.inputAccountProductNameSection}>
			{user.properties &&
				user.properties.map((property, index) => (
					<div
						className={styles.propertyNameInputDiv}
						key={index}
					>
						<InputField
							error={error?.[index]}
							value={property}
							label={`Property ${index + 1}`}
							type="text"
							onChange={(e) => updatePropertyName(e, index)}
						/>
						{index > 0 && (
							<button
								type="button"
								className={styles.removePropertyButton}
								onClick={() => removeProperty(index)}
							>
								&times;
							</button>
						)}
					</div>
				))}
			<button type="button" onClick={addProperty} className={styles.addPropertyButton}>
				+
			</button>
		</section>
	);
};

export const validateProperties = (properties) => {
	const errors = properties.map((property)=> {
		if(!property || !property.trim()){
			return "Property cannot be empty"
		}
		return null
	})

	const hasError = errors.some((err) => err !== null )
	return new FormValidationResult(!hasError, errors)
};
