import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";
import { FormValidationResult } from "../../InputDialogWizard/FormValidationResult";

export const InputAccountUserInfo = ({user, setUser, error}) => {
	
	return (
		<section className={styles.inputAccountUserInfoSection}>
			<InputField 
				label="Manager name"
				type="text"
				value={user.name}
				onChange={(e) => setUser({...user, name: e.target.value})}
				error={error?.name}
			/>
			<InputField 
				label="Email"
				type="email"
				value={user.email}
				onChange={(e) => setUser({...user, email: e.target.value})}
				error={error?.email}
			/>
			<InputField 
				label="Password"
				type="password"
				value={user.password}
				onChange={(e) => setUser({...user, password: e.target.value})}
				error={error?.password}
				placeholder="Choose a strong password"
			/>
		</section>
		)
}

export const validateUserInfo = (user) => {
	const errors = {
		name: null,
		email: null,
		password: null,
	};

	// Name validation
	if (!user.name.trim()) {
		errors.name = "Name is required";
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!user.email.trim()) {
		errors.email = "Email is required";
	} else if (!emailRegex.test(user.email)) {
		errors.email = "Invalid email address";
	}

	// Password validation
	if (!user.password.trim()) {
		errors.password = "Password is required";
	} else if (user.password.length < 6) {
		errors.password = "Password must be at least 6 characters";
	}

	// Check if any error exists
	const hasErrors = Object.values(errors).some((val) => val !== null);
	return new FormValidationResult(!hasErrors, errors)
};