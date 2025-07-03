import InputField from "../../../InputField/InputField";
import styles from "./InputDialogWizardShared.module.css";

export const InputAccountUserInformation = ({ user, setUser}) => {
	const countryCodes = [
		{ code: "+1", label: "+1 (US & CANADA)" },
		{ code: "+44", label: "+44 (UK)" },
		{ code: "+91", label: "+91 (INDIA)" },
	];
	return (
		<section className={styles.inputAccountUserInfoSection}>
			<InputField
				maxLength={50}
				placeholder={"Customer name"}
				type="text"
				value={user.name}
				onChange={(e) => setUser({ ...user, name: e.target.value })}
			/>
			<div className={styles.phoneInputWrapper}>
				<select
					className={styles.countryCodeSelect}
					value={user.phone.code}
					onChange={(e) => {
						const phoneObject = {...user.phone , code: e.target.value }
						setUser({ ...user, phone: phoneObject});
					}}
				>
					{countryCodes.map((c) => (
						<option key={c.code} value={c.code}>
							{c.label}
						</option>
					))}
				</select>

				<InputField
					placeholder={"Phone number"}
					type="tel"
					maxLength={10}
					value={user.phone.number}
					onChange={(e)=> {
						const phoneObject = {...user.phone, number: e.target.value }
						setUser({ ...user, phone: phoneObject});
					}}
				/>
			</div>
			<InputField
				placeholder={"Email"}
				type="email"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
			/>
			<InputField
				placeholder={"Password"}
				type="password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>
		</section>
	);
};
