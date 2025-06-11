import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase.config";
import { handleFirebaseError } from "../../utils/firebase/firebase_utility";

/**
 * Custom React hook to handle password reset functionality using Firebase.
 * 
 * @param {Function} triggerLoadingOverlay - Hook callback to display a loading overlay while the request is in progress.
 * @param {Function} hideLoadingOverlay - Hook callback to hide the loading overlay after the request completes.
 * @param {Function} showAlert - Hook callback to display alert messages to the user.
 * 
 * Usage:
 * - Typically used within a component to reset a user's password.
 * - `triggerLoadingOverlay`, `hideLoadingOverlay`, and `showAlert` should be provided by their respective custom hooks.
 * 
 * @returns {Object} An object containing the `handlePasswordReset` function to initiate the password reset process.
 */

const useResetPassword = (
	triggerLoadingOverlay,
	hideLoadingOverlay,
	showAlert,
) => {
	const handlePasswordReset = (email) => {
		triggerLoadingOverlay();
		sendPasswordResetEmail(auth, email)
			.then(() => {
				showAlert(
					"If a user exists with that email, a reset password link has been sent to that email",
					"Success",
				);
			})
			.catch((error) => {
				showAlert(handleFirebaseError(error), "Error");
			})
			.finally(() => {
				hideLoadingOverlay();
			});
	};
	return { handlePasswordReset };
};

export default useResetPassword;
