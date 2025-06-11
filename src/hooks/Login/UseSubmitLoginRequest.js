import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword, getIdTokenResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { handleFirebaseError } from "../../utils/firebase/firebase_utility";

/**
 * Custom React hook to handle user login using Firebase authentication.
 * 
 * @param {Function} triggerLoadingOverlay - Hook callback to display a loading overlay while the login request is in progress.
 * @param {Function} hideLoadingOverlay - Hook callback to hide the loading overlay after the request completes.
 * @param {Function} showAlert - Hook callback to display alert messages to the user, especially for login errors.
 * 
 * Usage:
 * - This hook is designed to be used in login forms to authenticate users with email and password.
 * - `triggerLoadingOverlay`, `hideLoadingOverlay`, and `showAlert` should be provided by custom hooks.
 * - Upon successful login, the user is either redirected to the admin panel or manager panel based on their token claims.
 * 
 * @returns {Object} An object containing the `handleSubmit` function which takes the event, email, and password as parameters to handle form submissions and login logic.
 */

const useSubmitLoginRequest = (
	triggerLoadingOverlay,
	hideLoadingOverlay,
	showAlert,
) => {
	const navigate = useNavigate();
	const handleSubmit = (e, email, password) => {
		e.preventDefault();
		triggerLoadingOverlay();

		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const token = await getIdTokenResult(userCredential.user);
				if (token.claims.admin) {
					navigate("/admin-panel");
				} else {
					navigate("/");
				}
			}).catch((error) => {
				showAlert(handleFirebaseError(error), "Error");
			}).finally(() => {
				hideLoadingOverlay();
			});
	};
	return { handleSubmit };
};

export default useSubmitLoginRequest;
