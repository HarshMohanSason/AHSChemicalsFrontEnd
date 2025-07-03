import React, { useRef, useState } from "react";
import styles from "./Accounts.module.css";
import sharedStyles from "../AdminPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronUp,
	faChevronDown,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import InputDialogWizard from "../InputDialogWizard/InputDialogWizard";
import { InputAccountUserInformation } from "./InputDialogWizardViews/InputAccountUserInformation";
import { InputAccountProperty } from "./InputDialogWizardViews/InputAccountProperty";
import { InputAccountBrands } from "./InputDialogWizardViews/InputAccountBrands";
import useAccounts from "../../../hooks/AdminPanel/Accounts/UseAccounts";
import { useAlertContext } from "../../../contexts/AlertBoxContext";
import CustomerAccountsSkeletonLoader from "../../SkeletonLoaders/CusomterAccountsSkeletonLoader";
import { useCustomersContext } from "../../../contexts/CustomersContext";

const Accounts = () => {
	const { confirmationAlert } = useAlertContext();
	const [accountDialogSubmitFunc, setAccountDialogSubmitFunc] =
		useState(null);
	const [isFetchingAccounts, setIsFetchingAccounts] = useState(false);
	const {
		createCustomerAccount,
		updateCustomerAccount,
		fetchedAccounts,
		refetchAccounts,
		deleteCustomerAccount,
	} = useAccounts();
	const customersProvider = useCustomersContext();
	const defaultUser = {
		name: "",
		phone: { code: "+1", number: "" },
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
				step: "User Information",
				view: (
					<InputAccountUserInformation
						user={user}
						setUser={setUser}
						error={wizardStepErrors[0]}
					/>
				),
			},
			{
				step: "Properties",
				view: (
					<InputAccountProperty
						user={user}
						setUser={setUser}
						error={wizardStepErrors[1]}
					/>
				),
			},
			{
				step: "Brands",
				view: (
					<InputAccountBrands
						user={user}
						setUser={setUser}
						error={wizardStepErrors[2]}
					/>
				),
			},
		];

		return wizardMode === "edit"
			? steps.filter((s) => s.step !== "User Information") // Remove UserInfo for edit
			: steps; // full steps for create
	};

	return (
		<section className={styles.adminPanelAccountsPage}>
			<button
				style={{alignSelf: "center"}}
				className={sharedStyles.syncIconButton}
				onClick={customersProvider.beginCustomersSync}
			>
				<i className="fas fa-sync-alt"></i> Sync Customers
			</button>
			<section
				className={sharedStyles.addDataTile}
				onClick={async () => {
					if (isExpanded) {
						// If already expanded collapse only, do nothing else
						setIsExpanded(false);
						return;
					}

					// If collapsed -> open it, immediately show skeleton, then fetch
					setIsExpanded(true);
					setIsFetchingAccounts(true);
					try {
						await refetchAccounts();
					} finally {
						setIsFetchingAccounts(false);
					}
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
			{isFetchingAccounts && (
				<CustomerAccountsSkeletonLoader
					accountsLength={fetchedAccounts?.length || 5}
				/>
			)}
			{!isFetchingAccounts && isExpanded && (
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
												updateCustomerAccount(user),
										);
										accountDialogWizardRef.current.showModal();
									}}
								>
									<p className={styles.accounTileTextDisplay}>
										{account.displayName}
									</p>
									<p className={styles.accounTileTextDisplay}>
										{account.email}
									</p>
								</div>
								<FontAwesomeIcon
									icon={faTrash}
									onClick={() => {
										confirmationAlert.showAlert(
											"Delete User?",
											`Are you sure you want to delete the account for ${account.displayName}`,
											() =>
												deleteCustomerAccount(account),
											"Delete",
											"red",
										);
									}}
									className={styles.deleteAccountIcon}
								/>
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
						() => (user) => createCustomerAccount(user),
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
