import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountUserInformation = ({ user, setUser, error }) => {
	return (
		<section className={styles.inputAccountUserInfoSection}>
			<InputField
				maxLength={50}
				placeholder={"Customer name"}
				type="text"
				value={user.name}
				onChange={(e) => setUser({ ...user, name: e.target.value })}
				error={error?.name}
			/>
			<InputField
				placeholder={"Phone number"}
				type="tel"
				maxLength={10}
				value={user.phone_number.replace(/^\+1/, "")}
				onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
				error={error?.phone_number}
			/>

			<InputField
				placeholder={"Email"}
				type="email"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				error={error?.email}
			/>
			<InputField
				placeholder={"Password"}
				type="password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				error={error?.password}
			/>
		</section>
	);
};
