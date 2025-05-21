import React from "react";
import InputField from "../../InputField";

export const FirstAndLastNameInput = ({ userInfo, setUserInfo }) => {
	return (
		<section className="input-dialog-product-info-view">
			<InputField
				label="First Name"
				type="text"
				name="firstName"
				value={userInfo.firstName}
				onChange={(e) =>
					setUserInfo({ ...userInfo, firstName: e.target.value })
				}
				required
				pattern="^[A-Za-z\s]+$"
				title="Name can only contain uppercase or lowercase letters"
			/>
			<InputField
				label="Last Name"
				type="text"
				name="lastName"
				value={userInfo.lastName}
				onChange={(e) =>
					setUserInfo({ ...userInfo, lastName: e.target.value })
				}
				required
				pattern="^[A-Za-z\s]+$"
				title="Name can only contain uppercase or lowercase letters"
			/>
		</section>
	);
};

export const PropertyNames = ({ userInfo, setUserInfo }) => {
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
						label={`Property ${index + 1}`}
						type="text"
						name="lastName"
						value={property}
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

export const EmailPasswordInput = ({ userInfo, setUserInfo }) => {
	return (
		<section className="input-dialog-product-info-view">
			<InputField
				label={"Email"}
				type="email"
				name="email"
				value={userInfo.email}
				onChange={(event) => setUserInfo({...userInfo, email: event.target.value})}
				required
			/>
			<InputField
				label={"Password"}
				type="password"
				name="password"
				value={userInfo.password}
				onChange={(event) => setUserInfo({...userInfo, password: event.target.value})}
				required
			/>
		</section>
	);
};
