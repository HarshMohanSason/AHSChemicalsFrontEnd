import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import "../styles/pages/Account.css";
import { useNavigate } from "react-router-dom";
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	getIdTokenResult,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { AlertBox } from "../components/AlertBox";
import { handleFirebaseError } from "../utils/firebase/firebase_utility";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { useAuth } from "../utils/firebase/AuthContext";

function Account() {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showLoadingOverlay, setLoadingOverlay] = useState(false);
	const [alertType, setAlertType] = useState("Error");

	const handleAlert = (type, message) => {
		setAlertType(type);
		setErrorMessage(message);
		setIsAlertOpen(true);
	};
	const triggerLoadingOverlay = (show) => {
		setLoadingOverlay(show);
	}

	const checkIfUserIsLoggedIn = async () => {
		// if the user is logged in, redirect them based on their role
		if (isLoading) {
			return <LoadingOverlay showOverlay={isLoading} />;
		}
		// if the app is still loading user data
		if (user) {
			if (user.isAdmin) {
				triggerLoadingOverlay(true);
				navigate("/admin-panel");
			} else {
				navigate("/");
			}
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		triggerLoadingOverlay(true);
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
				console.log(error);
				handleAlert("Error", handleFirebaseError(error));
			})
			.finally(() => {
				triggerLoadingOverlay(false);
			});
	}

	const handlePasswordReset = () => {
		triggerLoadingOverlay(true);
		sendPasswordResetEmail(auth, email)
			.then(() => {
				handleAlert(
					"Success",
					"If a user exists with that email, a reset password link has been sent to that email",
				);
			})
			.catch((error) => {
				handleAlert("Error", handleFirebaseError(error));
			})
			.finally(() => {
				triggerLoadingOverlay(false);
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
				isClose={() => setIsAlertOpen(false)}
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
			<button onClick={handlePasswordReset}>Forgot Password?</button>
		</section>
	);
}

export default Account;
