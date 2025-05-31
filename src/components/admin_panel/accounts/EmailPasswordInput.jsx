import React from "react";
import InputField from "../../InputField";
const EmailPasswordInput = ({ userInfo, setUserInfo }) => {
	return (
		<section className="input-dialog-product-info-view">
			<InputField
				label={"Email"}
				type="email"
				name="email"
				value={userInfo.email}
				onChange={(event) =>
					setUserInfo({ ...userInfo, email: event.target.value })
				}
				required
			/>
			<InputField
				label={"Password"}
				type="password"
				name="password"
				value={userInfo.password}
				onChange={(event) =>
					setUserInfo({ ...userInfo, password: event.target.value })
				}
				required
			/>
		</section>
	);
};

export default EmailPasswordInput;
