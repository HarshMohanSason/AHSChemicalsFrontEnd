import React, { useState, useRef } from "react";
import "../../../styles/components/admin_panel/input_dialog_views/InputFormDialog.css";
import { LoadingOverlay } from "../../LoadingOverlay";
const InputFormDialog = ({
	title,
	dialogRef,
	views,
	submitFunc,
	showLoadingOverlay,
}) => {
	const [currentView, setNextView] = useState(0); //Starting at the first view
	const formRef = useRef(null); //To check validity on each navigation

	const selectNextView = () => {
		if (currentView < views.length) {
			if (formRef.current.checkValidity()) {
				setNextView(currentView + 1);
			}
		}
	};

	const selectPreviousView = () => {
		if (currentView !== 0) {
			setNextView(currentView - 1);
		}
	};
	return (
		<dialog ref={dialogRef} className="input-form-dialog">
			<LoadingOverlay showOverlay={showLoadingOverlay} />
			<h2>{title}</h2>
			<div className="progress-bar">
				<div
					className="progress-fill"
					style={{
						width: `${((currentView + 1) / views.length) * 100}%`,
					}}
				></div>
			</div>
			<form ref={formRef} className="input-form" onSubmit={submitFunc}>
				{currentView >= 0 &&
					currentView < views.length &&
					views[currentView]}
				{currentView === 0 && (
					<button
						className="input-dialog-navigate-button"
						onClick={selectNextView}
					>
						Next
					</button>
				)}
				{currentView > 0 && currentView < views.length && (
					<div className="prev-next-button-div">
						<button
							type="button"
							className="input-dialog-navigate-button"
							onClick={selectPreviousView}
						>
							Prev
						</button>
						{currentView < views.length - 1 ? (
							<button
								type="button"
								className="input-dialog-navigate-button"
								onClick={selectNextView}
							>
								Next
							</button>
						) : (
							<button
								type="submit"
								className="input-dialog-navigate-button"
							>
								Submit
							</button>
						)}
					</div>
				)}
			</form>
			<button
				className="close-dialog-button"
				onClick={() => {
					dialogRef.current.close();
				}}
			>
				<i className="fas fa-times"></i>
			</button>
		</dialog>
	);
};

export default InputFormDialog;
