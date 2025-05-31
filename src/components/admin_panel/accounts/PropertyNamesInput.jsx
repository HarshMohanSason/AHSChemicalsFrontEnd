import React from "react";
import InputField from "../../InputField";

const PropertyNamesInput = ({ userInfo, setUserInfo }) => {
	const addProperty = () => {
		const oldProperties = [...userInfo.properties];
		oldProperties.push("");
		setUserInfo({ ...userInfo, properties: oldProperties });
	};

	const removeProperty = () => {
		const oldProperties = [...userInfo.properties];
		oldProperties.pop();
		setUserInfo({ ...userInfo, properties: oldProperties });
	};

	const updateProperty = (event, index) => {
		const oldProperties = [...userInfo.properties];
		oldProperties[index] = event.target.value;
		setUserInfo({ ...userInfo, properties: oldProperties });
	};
	return (
		<section className="input-dialog-product-info-view">
			{userInfo.properties.map((property, index) => {
				return (
					<InputField	
						key={index}
						label={`Property ${index + 1}`}
						type="text"
						name="lastName"
						value={property}
						required={index == 0 ? true : false}
						onChange={(e) => updateProperty(e, index)}
					/>
				);
			})}
			<div className="size-action-button-div">
				<button
					type="button"
					className="size-action-button"
					onClick={addProperty}
				>
					+
				</button>
				{userInfo.properties.length > 1 && (
					<button
						type="button"
						className="size-action-button"
						onClick={removeProperty}
					>
						-
					</button>
				)}
			</div>
		</section>
	);
};

export default PropertyNamesInput;