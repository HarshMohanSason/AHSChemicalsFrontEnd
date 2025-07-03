import { sendPasswordResetEmail } from "firebase/auth";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";
import { handleFirebaseError } from "../../utils/Firebase/ErrorHandler";
import { auth } from "../../utils/Firebase/FirebaseConfig";

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
) => {
	const loadingOverlay = useLoadingOverlayContext();
	const {alert} = useAlertContext();
	const handlePasswordReset = (email) => {
		loadingOverlay.trigger()
		sendPasswordResetEmail(auth, email)
			.then(() => {
				alert.showAlert(
					"If a user exists with that email, a reset password link has been sent to that email",
					"Success",
				);
			})
			.catch((error) => {
			 alert.showAlert(handleFirebaseError(error), "Error");
			})
			.finally(() => {
				loadingOverlay.hide();
			});
	};
	return { handlePasswordReset };
};

export default useResetPassword;
