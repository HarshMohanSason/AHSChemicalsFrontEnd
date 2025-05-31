import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import "../styles/pages/Login.css";
import { useNavigate } from "react-router-dom";
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	getIdTokenResult,
} from "firebase/auth";
import { auth } from "../firebase.config";
import AlertBox from "../components/AlertBox";
import { handleFirebaseError } from "../utils/firebase/firebase_utility";
import LoadingOverlay from "../components/LoadingOverlay";
import { useAuth } from "../utils/firebase/AuthContext";
import useAlert from "../hooks/UseAlertHook";
import useLoadingOverlay from "../hooks/LoadingOverlayHook";

function Login() {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay} = useLoadingOverlay();
	const { isAlertOpen, alertType, errorMessage, showAlert, closeAlert } = useAlert();

	const checkIfUserIsLoggedIn = async () => {
		// if the user is logged in, redirect them based on their role
		if (isLoading) {
			return <LoadingOverlay showOverlay={isLoading} />;
		}
		// if the app is still loading user data
		if (user) {
			if (user.isAdmin) {
				triggerLoadingOverlay();
				navigate("/admin-panel");
			} else {
				navigate("/");
			}
		}
	};

	function handleSubmit(e) {
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
			})
			.catch((error) => {
				showAlert(handleFirebaseError(error), "Error")
			})
			.finally(() => {
				hideLoadingOverlay()
			});
	}

	const handlePasswordReset = () => {
		triggerLoadingOverlay()
		sendPasswordResetEmail(auth, email)
			.then(() => {
				showAlert("If a user exists with that email, a reset password link has been sent to that email", "Success")
			})
			.catch((error) => {
				showAlert(handleFirebaseError(error), "Error");
			})
			.finally(() => {
				hideLoadingOverlay()
			});
	};

	useEffect(() => {
		checkIfUserIsLoggedIn();
	}, [user, navigate]);

	return (
		<section className="account-page">
			<AlertBox
				type={alertType}
				message={errorMessage}
				isOpen={isAlertOpen}
				isClose={closeAlert}
			/>
			<LoadingOverlay showOverlay={showLoadingOverlay} />
			<form className="login-form" onSubmit={handleSubmit}>
				<h1>Sign In</h1>
				<InputField
					label="Email"
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
					className="login-email-input"
					required
					maxLength={50}
				/>
				<InputField
					label="Password"
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter your password"
					className="login-password-input"
					required
				/>
				<button type="submit">Submit</button>
			</form>
			<button onClick={handlePasswordReset} className="forgot-password-button">Forgot Password?</button>
		</section>
	);
}

export default Login;
