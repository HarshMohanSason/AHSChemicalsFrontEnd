import React from "react";
import InputField from "../../InputField";

const FirstAndLastNameInput = ({ userInfo, setUserInfo }) => {
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

export default FirstAndLastNameInput;
