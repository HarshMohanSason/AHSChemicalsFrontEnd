import InputField from "../../components/InputField/InputField";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";
import styles from "./ContactUs.module.css";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import { reportError } from "../../utils/ErrorLogging/Error";

const ContactUs = () => {
	const loadingOverlay = useLoadingOverlayContext();
	const { alert } = useAlertContext();
	const submitForm = async (event) => {
		event.preventDefault();
		loadingOverlay.trigger();

		const form = event.target;
		const name = form.name.value;
		const phone = form.phone.value;
		const email = form.email.value;
		const location = form.location.value;
		const message = form.message.value;

		try {
			const response = await fetch(process.env.REACT_APP_CONTACT_US, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					phone,
					email,
					location,
					message,
				}),
			});
			if (response.status === 200) {
				form.reset();
				alert.showAlert("Thank you for reaching out to us. We will reach out to you as soon as possible!", "Success");
			}
			const responseJson = await response.json();
			if (!response.ok) {
				throw new Error(responseJson.message);
			}
		} catch (error) {
			reportError(error, {
				route: "/contact-us",
				formData: {
					name,
					phone,
					email,
					location,
					message,
				},
			});
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	return (
		<section className={styles.contactUsPage}>
			<section className={styles.contactUsFormSection}>
				<section className={styles.headingSection}>
					<h1>Contact Us</h1>
					<p>
						<i>Let's get in touch</i>
					</p>
				</section>
				<form className={styles.formSection} onSubmit={submitForm}>
					<div>
						<InputField
							name="name"
							placeholder="Name"
							type="text"
							required
							pattern="^[A-Za-z]+(?: [A-Za-z]+){0,3}$"
							title="Please enter a valid name. Only letters and single spaces are allowed."
						/>
						<InputField
							name="phone"
							placeholder="Phone"
							type="tel"
							required
							maxLength={10}
							pattern="^[0-9]{10}$"
							title="Please enter a 10-digit phone number without spaces or dashes."
						/>
					</div>
					<div>
						<InputField
							name="email"
							placeholder="Email"
							type="email"
							required
							pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
							title="Please enter a valid email address."
						/>
						<InputField
							name="location"
							placeholder="Location"
							type="text"
							required
							pattern="^[A-Za-z0-9\s,.\-]+$"
							title="Please enter a valid location (letters, numbers, commas, periods, and dashes allowed)."
						/>
					</div>
					<textarea placeholder="Message" name="message" />
					<button type="submit">Submit</button>
				</form>
			</section>
		</section>
	);
};

export default ContactUs;
