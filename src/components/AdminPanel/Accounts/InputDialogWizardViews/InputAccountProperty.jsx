import { useEffect, useState } from "react";
import { getCountyInfoFromFirestore } from "../../../../utils/firebase/firebase_utility";
import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountProperty = ({ user, setUser, errors }) => {
	const [countyInfo, setCountyInfo] = useState([]);

	const addProperty = () => {
		const oldProperties = [...user.properties];
		oldProperties.push({
			street: "",
			city: countyInfo[0].city,
			county: countyInfo[0].county,
			state: "CALIFORNIA",
			postal: "",
		});
		setUser({ ...user, properties: oldProperties });
	};

	const removeProperty = (index) =>
		setUser({
			...user,
			properties: user.properties.filter((_, idx) => idx !== index),
		});

	const updatePropertyInfo = (index, key, value) => {
		const oldProperties = [...user.properties];
		oldProperties[index][key] = value;
		setUser({ ...user, properties: oldProperties });
	};

	const getCountyInfo = async () => {
		try {
			const counties = await getCountyInfoFromFirestore();
			setCountyInfo(counties);
			sessionStorage.setItem("countyInfo", JSON.stringify(counties));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const cached = sessionStorage.getItem("countyInfo");
		if (cached) {
			setCountyInfo(JSON.parse(cached));
		} else {
			getCountyInfo();
		}
	}, []);

	return (
		<section className={styles.inputAccountPropertySection}>
			{user.properties &&
				user.properties.map((property, index) => (
					<div className={styles.propertyNameInputDiv} key={index}>
						<InputField
							style={{width: "80%"}}
							error={errors?.[index]?.street}
							value={property.street}
							placeholder={"Street"}
							type="text"
							onChange={(e) =>
								updatePropertyInfo(
									index,
									"street",
									e.target.value,
								)
							}
						/>
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
							<div className={styles.selectCityStateDiv}>
								<p>Select City</p>
								<select
									onChange={(e) => {
										const city = e.target.value;
										const countyObject =
											countyInfo.find(
												(value) => value.city === city,
											);
										updatePropertyInfo(index, "city", city);
										updatePropertyInfo(
											index,
											"county",
											countyObject.county,
										);
									}}
								>
									{[
										...new Set(
											countyInfo.map(
												(info) => info.county,
											),
										),
									].map((county) => (
										<optgroup label={county} key={county}>
											{countyInfo
												.filter(
													(info) =>
														info.county === county,
												)
												.map((info) => (
													<option
														key={info.city}
														value={info.city}
													>
														{info.city}
													</option>
												))}
										</optgroup>
									))}
								</select>
							</div>
							<div className={styles.selectCityStateDiv}>
								<p>Select State</p>
								<select
									onChange={(e) =>
										updatePropertyInfo(
											index,
											"state",
											e.target.value,
										)
									}
								>
									{[
										...new Set(
											countyInfo.map(
												(value) => value.state,
											),
										),
									].map((state, index) => (
										<option key={index} value={state}>
											{state}
										</option>
									))}
								</select>
							</div>
							<InputField
								style={{width: "100%", marginTop: "30px"}}
								placeholder={"Postal"}
								maxLength={5}
								type="tel"
								value={property.postal}
								error={errors?.[index]?.postal}
								onChange={(e) =>
									updatePropertyInfo(
										index,
										"postal",
										e.target.value,
									)
								}
							/>
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
