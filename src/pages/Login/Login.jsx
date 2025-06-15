import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField/InputField";
import "./Login.css";
import useResetPassword from "../../hooks/Login/UseResetPassword";
import useSubmitLoginRequest from "../../hooks/Login/UseSubmitLoginRequest";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";

const Login = () => {
	const { user, isLoading } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const loadingOverlay = useLoadingOverlayContext();
	const { handlePasswordReset } = useResetPassword();
	const { handleSubmit } = useSubmitLoginRequest();
	
	//To redirect user back to their dashboard/admin-panel page if they come back to the page again
	useEffect(() => {
		if (isLoading) return;
		if (user) {
			if (user.isAdmin) navigate("/admin-panel");
		}
	}, [user, isLoading, navigate]);

	return (
		<section className="account-page">
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
