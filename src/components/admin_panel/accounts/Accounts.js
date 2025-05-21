import React, { useEffect, useRef, useState } from "react";
import "../../../styles/components/admin_panel/accounts/Accounts.css";
import InputFormDialog from "../input_dialog_views/InputFormDialog";
import {
	FirstAndLastNameInput,
	PropertyNames,
	EmailPasswordInput,
} from "./AccountsInputDialogViews";
import { AlertBox } from "../../AlertBox";
import useAlert from "../../../hooks/UseAlertHook";
import useLoadingOverlay from "../../../hooks/LoadingOverlayHook";
import {
	createAccount,
	handleFirebaseError,
} from "../../../utils/firebase/firebase_utility";

function Accounts() {
	const [openExistingAccounts, setExistingAccounts] = useState(false);
	const [openCreateNewAccount, setCreateNewAccount] = useState(false);
	const defaultUserInfo = {
		firstName: "",
		lastName: "",
		properties: [""],
		email: "",
		password: "",
	};
	const [userInfo, setUserInfo] = useState(defaultUserInfo);
	const creatAccountDialogRef = useRef(null);
	const deleteAccountDialogRef = useRef(null);
	const createAccountDialogViews = [
		<FirstAndLastNameInput userInfo={userInfo} setUserInfo={setUserInfo} />,
		<PropertyNames userInfo={userInfo} setUserInfo={setUserInfo} />,
		<EmailPasswordInput userInfo={userInfo} setUserInfo={setUserInfo} />,
	];

	const [currentUsers, setCurrentUsers] = useState([]);
	const { showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay } =
		useLoadingOverlay();
	const { isAlertOpen, alertType, errorMessage, showAlert, closeAlert } =
		useAlert();

	const createUser = async (event) => {
		event.preventDefault();
		triggerLoadingOverlay();

		try {
			const response = await fetch(process.env.REACT_APP_CREATE_ACCOUNT, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userInfo),
			});

			const text = await response.text();
			if (!response.ok) throw new Error(text);
			showAlert("Successfully created the account", "Success");
			setUserInfo(defaultUserInfo);
			creatAccountDialogRef.current.close();
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			hideLoadingOverlay();
		}
	};

	const fetchAccounts = async () => {
		try {
			const response = await fetch(process.env.REACT_APP_FETCH_ACCOUNTS, {
				method: "GET",
				credentials: "include",
			});

			if (!response.ok) {
				const errorText = await response.text(); // Read error message as plain text
				throw new Error(errorText);
			}
			const fetchedUsers = await response.json();
			setCurrentUsers(fetchedUsers);
		} catch (error) {
			showAlert(error.message, "Error");
		}
	};
	const deleteAccount = async (uuid) => {
		try {
			const response = await fetch(process.env.REACT_APP_DELETE_ACCOUNT, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(uuid),
			});

			if (!response.ok) {
				const errorText = await response.text(); // Read error message as plain text
				throw new Error(errorText);
			}
			showAlert("Account deleted succcessfully", "Success");
		} catch (error) {
			showAlert(error.message, "Error");
		}
	}

	useEffect(() => {
		fetchAccounts();
	}, []);

	return (
		<section className="accounts-view">
			<AlertBox
				message={errorMessage}
				isOpen={isAlertOpen}
				isClose={closeAlert}
				type={alertType}
			/>
			<section
				className="add-a-product-section"
				onClick={() => setExistingAccounts(!openExistingAccounts)}
			>
				<h3>Existing Accounts</h3>
				<button>{openExistingAccounts ? "-" : "+"} </button>
			</section>
			<section
				className="display-current-users-section"
				style={{ display: openExistingAccounts ? "flex" : "none" }}
			>
				{currentUsers.map((user, index) => {
					return (
						<div className="edit-account-user-display-tile">
							<h3>{user.displayName}</h3>
							<button
								onClick={() =>
									deleteAccountDialogRef.current.showModal()
								}
								style={{ border: "none", background: "none" }}
							>
								<i class="fas fa-trash"></i>
							</button>
						</div>
					);
				})}
			</section>

			<section className="add-a-product-section">
				<h3>Create Account</h3>
				<button
					onClick={() => {
						setCreateNewAccount(!openCreateNewAccount);
						creatAccountDialogRef.current.showModal();
					}}
				>
					{" "}
					+
				</button>
			</section>
			<InputFormDialog 
				title="Create an account"
				dialogRef={creatAccountDialogRef}
				views={createAccountDialogViews}
				submitFunc={createUser}
				showLoadingOverlay={showLoadingOverlay}
			/>
			<dialog
				ref={deleteAccountDialogRef}
				className="delete-account-dialog-box"
			>
				<h2>
					Are you sure you want to delete this user's account. Note:
					This action cannot be undone
				</h2>
				<div className="buttons">
					<button>Delete Account</button>
					<button
						onClick={() => deleteAccountDialogRef.current.close()}
					>
						Cancel
					</button>
				</div>
			</dialog>
		</section>
	);
}

export default Accounts;
