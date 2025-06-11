import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField/InputField";
import "./Login.css";
import AlertBox from "../../components/AlertBox/AlertBox";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import useLoadingOverlay from "../../hooks/LoadingOverlay/LoadingOverlayHook";
import useResetPassword from "../../hooks/Login/UseResetPassword";
import {useAlert} from "../../hooks/Alert/UseAlertHook";
import useSubmitLoginRequest from "../../hooks/Login/UseSubmitLoginRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/firebase/AuthContext";

const Login = () => {

	const { user, isLoading } = useAuth();
	const navigate = useNavigate();
	const { showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay } =
		useLoadingOverlay();
	const { isAlertOpen, alertType, alertMessage, showAlert, alertId } = useAlert();
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { handlePasswordReset } = useResetPassword(
		triggerLoadingOverlay,
		hideLoadingOverlay,
		showAlert,
	);
	const { handleSubmit } = useSubmitLoginRequest(
		triggerLoadingOverlay,
		hideLoadingOverlay,
		showAlert,
	);

	//To redirect user back to their dashboard/admin-panel page if they come back to the page again 
	useEffect(() => {
		if (isLoading) return;
		if (user) {
			triggerLoadingOverlay?.();
			if (user.isAdmin) navigate("/admin-panel");
		}
	}, [user, isLoading, navigate]);

	return (
		<section className="account-page">
			<AlertBox
				key={alertId}
				message={alertMessage}
				isOpen={isAlertOpen}
				type={alertType}
			/>
			<LoadingOverlay showOverlay={showLoadingOverlay} />
			<form
				className="login-form"
				onSubmit={(e) => handleSubmit(e, email, password)}
			>
				<h1>Sign In</h1>
				<InputField
					label="Email"
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
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
					required
				/>
				<button type="submit">Submit</button>
			</form>
			<button
				onClick={() => handlePasswordReset(email)}
				className="forgot-password-button"
			>
				Forgot Password?
			</button>
		</section>
	);
};

export default Login;
