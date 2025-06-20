import React from "react";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import styles from "./AlertBox.module.css";

const ConfirmationAlertBox = () => {
	const dialogRef = React.useRef(null);
	const {
		confirmationAlert
	} = useAlertContext();
	
	React.useEffect(() => {
		if (confirmationAlert.isOpen) {
			dialogRef.current?.showModal();
		}
	}, [confirmationAlert.isOpen]);

	return (
		<dialog ref={dialogRef} className={styles.confirmationAlertDialog}>
			<h2>{confirmationAlert.title}</h2>
			<p>{confirmationAlert.text}</p>
			<div>
				<button
					className={styles.cancelButton}
					onClick={() => dialogRef.current?.close()}
				>
					Cancel
				</button>
				<button
					onClick={() => {
						confirmationAlert.confirmFunc();
						dialogRef.current?.close();
					}}
					className={styles.confirmButton}
					style={{ backgroundColor: confirmationAlert.confirmButtonColor }}
				>
					{confirmationAlert.confirmButtonText}
				</button>
			</div>
		</dialog>
	);
};
export default ConfirmationAlertBox;
