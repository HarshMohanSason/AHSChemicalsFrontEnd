import React from "react";
import styles from "./AlertBox.module.css";

const ConfirmationAlertBox = ({
	confirmationTitle,
	confirmationText,
	confirmButtonText,
	confirmButtonColor,
	confirmationFunc,
	isOpen,
}) => {
	const dialogRef = React.useRef(null);

	React.useEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		}
	}, [isOpen]);

	return (
		<dialog ref={dialogRef} className={styles.confirmationAlertDialog}>
			<h2>{confirmationTitle}</h2>
			<p>{confirmationText}</p>
			<div>
				<button
					className={styles.cancelButton}
					onClick={() => dialogRef.current?.close()}
				>
					Cancel
				</button>
				<button
					onClick={() => {
						confirmationFunc();
						dialogRef.current?.close();
					}}
					className={styles.confirmButton}
					style={{ backgroundColor: confirmButtonColor }}
				>
					{confirmButtonText}
				</button>
			</div>
		</dialog>
	);
};
export default ConfirmationAlertBox;
