import React, { useRef, useState } from "react";
import styles from "./Accounts.module.css";
import sharedStyles from "../AdminPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronUp,
	faChevronDown,
	faSpinner,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import InputDialogWizard from "../InputDialogWizard/InputDialogWizard";
import {
	InputAccountUserInfo,
	validateUserInfo,
} from "./InputDialogWizardViews/InputAccountUserInfo";
import {
	InputAccountPropertyNames,
	validateProperties,
} from "./InputDialogWizardViews/InputAccountPropertyNames";
import { InputAccountBrandName, validateInputAccountBrandName } from "./InputDialogWizardViews/InputAccountBrandNames";
import useAccounts from "../../../hooks/AdminPanel/Accounts/Accounts";
import { useAlertContext } from "../../../contexts/AlertBoxContext";

const Accounts = () => {
	const {alert, confirmationAlert} = useAlertContext();
	const [accountDialogSubmitFunc, setAccountDialogSubmitFunc] =
		useState(null);
	const {
		createManagerAccount,
		updateManagerAccount,
		fetchedAccounts,
		fetchAccountsLoading,
		refetchAccounts,
		deleteManagerAccount,
		deleteAccountIDs,
	} = useAccounts()

	const defaultUser = {
		name: "",
		email: "",
		password: "",
		properties: [""],
		brands: [],
	};
	const [user, setUser] = useState(defaultUser);
	//To check if the edit accounts section is opened or not
	const [isExpanded, setIsExpanded] = useState(false);

	const accountDialogWizardRef = useRef(null);
	const [currentView, setCurrentView] = useState(0); //Starting at first view
	const [wizardMode, setWizardMode] = useState("create");

	//Each step has its own error state
	const [wizardStepErrors, setWizardStepErrors] = useState([
		{}, //User Info errors
		[], //Property name errors
		null, //Single error for brand names
	]);

	const triggerWizardStepError = (error, index) => {
		const oldErrors = [...wizardStepErrors];
		oldErrors[index] = error;
		setWizardStepErrors(oldErrors);
	};

	const getWizardSteps = () => {
		const steps = [
			{
				step: "UserInfo",
				view: (
					<InputAccountUserInfo
						user={user}
						setUser={setUser}
						error={wizardStepErrors[0]}
					/>
				),
				validate: () => validateUserInfo(user),
			},
			{
				step: "Properties",
				view: (
					<InputAccountPropertyNames
						user={user}
						setUser={setUser}
						error={wizardStepErrors[1]}
					/>
				),
				validate: () => validateProperties(user.properties),
			},
			{
				step: "Brands",
				view: (
					<InputAccountBrandName
						user={user}
						setUser={setUser}
						error={wizardStepErrors[2]}
					/>
				),
				validate: null,
			},
		];

		return wizardMode === "edit"
			? steps.filter((s) => s.step !== "UserInfo") // Remove UserInfo for edit
			: steps; // full steps for create
	};

	return (
		<section className={styles.adminPanelAccountsPage}>
			<section
				className={sharedStyles.addDataTile}
				onClick={() => {
					setIsExpanded(!isExpanded);
					refetchAccounts();
				}}
			>
				<p>Edit Account</p>
				<button>
					<FontAwesomeIcon
						icon={isExpanded ? faChevronUp : faChevronDown}
						className={styles.editAccountIcon}
					/>
				</button>
			</section>
			{fetchAccountsLoading && isExpanded && (
				<FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
			)}
			{!fetchAccountsLoading && isExpanded && (
				<section className={styles.expandedEditAccountsSection}>
					{fetchedAccounts &&
						fetchedAccounts.map((account, index) => (
							<div
								className={styles.managerAccountTile}
								key={index}
							>
								<div
									className={styles.managerAccountInfoTile}
									onClick={() => {
										setUser(account);
										setCurrentView(0);
										setWizardMode("edit");
										setAccountDialogSubmitFunc(
											() => (user) =>
												updateManagerAccount(user),
										);
										accountDialogWizardRef.current.showModal();
									}}
								>
									<p className={styles.accounTileDisplayName}>
										{account.displayName}
									</p>
									<div
										className={styles.accountTileProperties}
									>
										{account.properties.map(
											(property, propertyIndex) => (
												<p key={propertyIndex + 1}>
													{property}
												</p>
											),
										)}
									</div>
								</div>
								{deleteAccountIDs.includes(account.uid) ? (
									<FontAwesomeIcon
										icon={faSpinner}
										style={{
											color: "black",
											fontSize: "30px",
										}}
										className={styles.spinner}
									/>
								) : (
									<FontAwesomeIcon
										icon={faTrash}
										onClick={() =>
											confirmationAlert.showAlert(
												"Delete User?",
												`Are you sure you want to delete the account for ${account.displayName}`,
												() =>
													deleteManagerAccount(
														account,
													),
												"Delete",
												"red",
											)
										}
										className={styles.deleteAccountIcon}
									/>
								)}
							</div>
						))}
				</section>
			)}
			<section
				className={sharedStyles.addDataTile}
				onClick={() => {
					setUser(defaultUser);
					setCurrentView(0);
					setWizardMode("create");
					setAccountDialogSubmitFunc(
						() => (user) => createManagerAccount(user),
					);
					accountDialogWizardRef.current.showModal();
				}}
			>
				<p>Create Account</p>
				<button>+</button>
			</section>
			<InputDialogWizard
				dialogRef={accountDialogWizardRef}
				steps={getWizardSteps()}
				setStepError={triggerWizardStepError}
				handleSubmit={() => accountDialogSubmitFunc(user)}
				currentView={currentView}
				setCurrentView={setCurrentView}
			/>	
		</section>
	);
};

export default Accounts;
