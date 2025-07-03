import { useCustomersContext } from "../../../../contexts/CustomersContext";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountProperty = ({ user, setUser }) => {
	const customersProvider = useCustomersContext();
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

	const updatePropertyInfo = (index, propertyID) => {
		const oldProperties = [...user.properties];
		oldProperties[index] = propertyID;
		setUser({ ...user, properties: oldProperties });
	};

	return (
		<section className={styles.inputAccountPropertySection}>
			{user.properties &&
				user.properties.map((property, index) => (
					<div className={styles.propertyInputDiv} key={index}>
						<section className={styles.cityStatePostalInputDiv}>
							{index > 0 && (
								<button
									type="button"
									className={styles.removePropertyButton}
									onClick={() => removeProperty(index)}
								>
									&times;
								</button>
							)}
							<div className={styles.selectPropertyDiv}>
								<select
									onChange={(e) =>
										updatePropertyInfo(
											index,
											e.target.value,
										)
									}
									value={property}
								>
									<option value="">Select Property</option>
									{customersProvider.formattedCustomersForDisplay.map(
										(prop) => (
											<option
												key={prop.Id}
												value={prop.Id}
											>
												{prop.Property.Name}{" "}
												{prop.Property.Address?.Line1},{" "}
												{prop.Property.Address?.City},{" "}
												{
													prop.Property.Address
														?.CountrySubDivisionCode
												}{" "}
												{
													prop.Property.Address
														.PostalCode
												}
											</option>
										),
									)}
								</select>
							</div>
						</section>
					</div>
				))}
			<button
				type="button"
				onClick={addProperty}
				className={styles.addPropertyButton}
			>
				+
			</button>
		</section>
	);
};
