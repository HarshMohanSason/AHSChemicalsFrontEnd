import React from "react";
import "../styles/components/LoginPopup.css"

const LoginPopup = ({title, bodyText, dialogRef}) => {
	return (
		<dialog ref={dialogRef} className="login-popup">
			<div className="inner-box">
				<button onClick={()=> dialogRef.current.close()}>&times;</button>
				<h1>{title}</h1>
				<p>{bodyText}</p>
			</div>
		</dialog>
		)
}

export default LoginPopup;