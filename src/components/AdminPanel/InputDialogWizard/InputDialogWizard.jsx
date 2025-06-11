import React, { useState } from "react";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import styles from "./InputDialogWizard.module.css";

/**
 * InputDialogWizard
 *
 * A multi-step input dialog component used to collect data in a step-by-step form.
 *
 * @param {React.RefObject} props.dialogRef - Reference to the HTMLDialogElement. Used to control open/close state.
 * @param {Array} props.steps - An array of step objects. Each step must have:
 *   - {string} step: Name of the step (displayed in the stepper UI)
 *   - {JSX.Element} view: The input component to be rendered for this step
 *   - {Function} validate: A function that returns `{ isValid: boolean, message?: string }`
 * @param {Function} props.stepError - Callback function to display error messages in the input component passed which is passed back to the parent component, which then passes the state of the error to the input form component
 * @param {Fuction} handleSubmit - Callback function to submit the form data to a REST API
 */
const InputDialogWizard = ({
	dialogRef,
	steps,
	setStepError,
	handleSubmit,
	currentView,
	setCurrentView,
	isLoading = false, 
}) => {
	//Check if the user is allowed to navigate to the next view. Returns the error object
	const isViewCompleted = () => {
		if (currentView < steps.length) {
			const check = steps[currentView].validate?.();
			if (check.isValid) {
				return null;
			} else {
				return check.message;
			}
		}
	};
	
	const nextView = (nextViewIndex) => {
		setCurrentView(nextViewIndex);
	};

	return (
		<dialog ref={dialogRef} className={styles.inputFormDialogWizard}>
			<div className={styles.dialogContent}>
				<div className={styles.stepperContainer}>
					{steps.map((step, index) => (
						<React.Fragment key={index}>
							<div className={styles.stepCircles}>
								<div
									className={`${styles.stepCircle} ${
										index < currentView
											? styles.completedCircle
											: index === currentView
												? styles.activeCircle
												: ""
									}`}
								></div>
								<p className={styles.stepLabel}>{step.step}</p>
								{index !== steps.length - 1 && (
									<div
										className={`${styles.stepLine} ${
											index < currentView
												? styles.activeStepLine
												: ""
										}`}
									></div>
								)}
							</div>
						</React.Fragment>
					))}
				</div>
				<hr className={styles.stepperHR} />
				<form method="post">
					{steps.length != 0 && currentView < steps.length && steps[currentView].view}
					<hr />
					<div
						className={`${styles.viewButtonDiv} ${
							currentView === 0 ? styles.onlyNext : ""
						}`}
					>
						{currentView > 0 && (
							<button
								type="button"
								className={styles.formSubmitButton}
								onClick={() => {
									if (currentView > 0) {
										nextView(currentView - 1);
									}
								}}
							>
								Prev
							</button>
						)}
						<button
							type="button"
							className={styles.formSubmitButton}
							onClick={() => {
								if (currentView === steps.length - 1) {
									handleSubmit();
								} else {
									const error = isViewCompleted();
									if (!error) {
										setStepError(null, currentView);
										nextView(currentView + 1);
									} else {
										setStepError(error, currentView);
									}
								}
							}}
						>
							{currentView == steps.length - 1
								? "Submit"
								: "Next"}
						</button>
					</div>
				</form>
				<button
					onClick={() => dialogRef.current.close()}
					className={styles.closeButton}
				>
					&times;
				</button>
			</div>
		<LoadingOverlay 
			showOverlay={isLoading}
		/>
		</dialog>
	);
};

export default InputDialogWizard;
