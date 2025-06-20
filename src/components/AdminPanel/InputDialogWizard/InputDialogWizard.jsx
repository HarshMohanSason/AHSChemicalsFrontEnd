import React, { useState } from "react";
import { useLoadingOverlayContext } from "../../../contexts/LoadingOverlayContext";
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
	handleSubmit,
	currentView,
	setCurrentView,
}) => {
	const loadingOverlay = useLoadingOverlayContext();
	const [moveBar, setMoveBar] = useState(false);

	const changeView = (index) => {
		setCurrentView(index);
		setMoveBar(true);
	};

	const getBarPosition = () => {
		if (moveBar) {
			return `translateX(${currentView * 100}%)`;
		}
	};

	return (
		<dialog ref={dialogRef} className={styles.inputFormDialogWizard}>
			<div className={styles.dialogContent}>
				<section className={styles.stepperContainer}>
					<div className={styles.stepLabelDiv} style={{justifyContent: steps.length > 1 ? "space-between": "center"}}>
						{steps.map((step, index) => (
							<p
								className={`${styles.stepLabel} ${currentView === index ? styles.activeLabel : ""}`}
								key={index}
								onClick={() => changeView(index)}
							>
								{step.step}
							</p>
						))}
					</div>
					<div className={styles.outerProgressBar}>
						<div
							className={styles.innerMovableBar}
							style={{
								width: `${100 / steps.length}%`,
								transform: `${getBarPosition()}`,
							}}
						></div>
					</div>
				</section>
				<form method="post">
					{steps.length != 0 &&
						currentView < steps.length &&
						steps[currentView].view}
					{currentView === steps.length - 1 && (
						<button
							onClick={(e) => {
								e.preventDefault();
								handleSubmit();
							}}
							className={styles.formSubmitButton}
						>
							Submit
						</button>
					)}
				</form>
			</div>
			<button
				onClick={() => dialogRef.current.close()}
				className={styles.closeButton}
			>
				&times;
			</button>
			{loadingOverlay.show && <LoadingOverlay />}
		</dialog>
	);
};

export default InputDialogWizard;
