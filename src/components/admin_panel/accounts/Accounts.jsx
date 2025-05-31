import React, { useEffect, useRef, useState } from "react";
import "../../../styles/components/admin_panel/accounts/Accounts.css";
import InputFormDialog from "../InputFormDialog";
import AlertBox from "../../AlertBox";
import useAlert from "../../../hooks/UseAlertHook";
import useLoadingOverlay from "../../../hooks/LoadingOverlayHook";
import BrandSelectorInput from "./BrandSelectorInput";
import EmailPasswordInput from "./EmailPasswordInput";
import FirstAndLastNameInput from "./FirstAndLastNameInput";
import PropertyNamesInput from "./PropertyNamesInput";
import {
	createAccount,
	handleFirebaseError,
} from "../../../utils/firebase/firebase_utility";
import { auth } from "../../../firebase.config";
import { useAuth } from "../../../utils/firebase/AuthContext";

function Accounts() {
	const [openCreateNewAccount, setCreateNewAccount] = useState(false);
	const defaultUserInfo = {
		firstName: "",
		lastName: "",
		properties: [""],
		brands: [],
		email: "",
		password: "",
	};
	const {user} = useAuth();
	const [userInfo, setUserInfo] = useState(defaultUserInfo);
	const dialogRef = useRef(null);
	const [dialogMode, setDialogMode] = useState("create");
	const deleteAccountDialogRef = useRef(null);
	const CreateAccountDialogViews = [
		<FirstAndLastNameInput userInfo={userInfo} setUserInfo={setUserInfo} />,
		<PropertyNamesInput userInfo={userInfo} setUserInfo={setUserInfo} />,
		<BrandSelectorInput userInfo={userInfo} setUserInfo={setUserInfo} />,
		<EmailPasswordInput userInfo={userInfo} setUserInfo={setUserInfo} />,
	];

	const EditAccountDialogViews = [
		<PropertyNamesInput userInfo={userInfo} setUserInfo={setUserInfo} />,
		<BrandSelectorInput userInfo={userInfo} setUserInfo={setUserInfo} />,
	];

	const [currentUsers, setCurrentUsers] = useState([]);
	const [openExistingAccounts, setExistingAccounts] = useState(false);

	const { showLoadingOverlay, triggerLoadingOverlay, hideLoadingOverlay } =
		useLoadingOverlay();
	const { isAlertOpen, alertType, errorMessage, showAlert, closeAlert } =
		useAlert();

	const [deleteUid, setDeleteUid] = useState("");
	
	const fetchUsers = async () => {
		try {
			if (user) {
				const response = await fetch(
					process.env.REACT_APP_FETCH_ACCOUNTS,
					{
						method: "GET",
						credentials: "include",
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					},
				);
				const data = await response.json();
				if (!response.ok) {
					throw new Error(
						data.message || "Error occured fetching the accounts",
					);
				}
				setCurrentUsers(data);
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			hideLoadingOverlay();
		}
	};

	const createUser = async (event) => {
		event.preventDefault();
		triggerLoadingOverlay();

		try {
			if (user) {
				const response = await fetch(
					process.env.REACT_APP_CREATE_ACCOUNT,
					{
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify(userInfo),
					},
				);
				const responseMessage = await response.text();
				if (!response.ok) {
					throw new Error(responseMessage);
				}
				showAlert(responseMessage, "Success");
				dialogRef.current.close();
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			hideLoadingOverlay();
		}
	};

	const deleteAccount = async (uuid) => {
		triggerLoadingOverlay();
		try {
			if (user) {
				const response = await fetch(
					process.env.REACT_APP_DELETE_ACCOUNT,
					{
						method: "DELETE",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify({ uid: uuid }),
					},
				);
				const responseMessage = await response.text();
				if (!response.ok) {
					throw new Error(responseMessage);
				}
				showAlert(responseMessage, "Success");
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			hideLoadingOverlay();
		}
	};

	const updateUser = async () => {
		triggerLoadingOverlay();
		try {
			if (user) {
				const response = await fetch(
					process.env.REACT_APP_UPDATE_ACCOUNT,
					{
						method: "PUT",
						credentials: "include",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify(userInfo),
					},
				);

				const responseMessage = await response.text();
				if (!response.ok) {
					throw new Error(responseMessage);
				}
				showAlert(responseMessage, "Success");
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			hideLoadingOverlay();
		}
	};

	const getDialogContent = () => {
		switch (dialogMode) {
			case "create":
				return {
					title: "Create an account",
					views: CreateAccountDialogViews,
					submitFunc: createUser,
				};
			case "edit":
				return {
					title: "Edit account",
					views: EditAccountDialogViews,
					submitFunc: updateUser,
				};
			default:
				return {
					title: "",
					views: [],
					submitFunc: () => {},
				};
		}
	};

	useEffect(() => {
		fetchUsers();
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
				<button>
					{openExistingAccounts ? (
						<i
							className="fas fa-chevron-down"
							style={{
								fontSize: "20px",
								display: "flex",
								justifyContent: "center",
							}}
						></i> // Down icon
					) : (
						<i
							className="fas fa-chevron-up"
							style={{
								fontSize: "20px",
								display: "flex",
								justifyContent: "center",
							}}
						></i> // Up icon
					)}
				</button>
			</section>
			<section
				className="display-current-users-section"
				style={{ display: openExistingAccounts ? "flex" : "none" }}
			>
				{currentUsers.map((user, index) => {
					return (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<div
								className="edit-account-user-display-tile"
								key={index}
								onClick={() => {
									setUserInfo(user);
									setDialogMode("edit");
									dialogRef.current.showModal();
								}}
								style={{
									width: "100%",
									alignItems: "center",
								}}
							>
								<h3>{user.displayName}</h3>
								<div
									style={{
										display: "flex",
										width: "100%",
										flexDirection: "column",
										gap: "10px",
									}}
								>
									{user.properties.length >= 1 &&
										user.properties.map(
											(property, index) => {
												return (
													<h3
														style={{
															margin: "0",
															padding: "0",
														}}
													>
														{property}
													</h3>
												);
											},
										)}
								</div>
							</div>
							<button
								onClick={() => {
									deleteAccountDialogRef.current.showModal();
									setDeleteUid(user.uid);
								}}
								style={{ border: "none", background: "none" }}
							>
								<i
									className="fas fa-trash"
									style={{ color: "red", fontSize: "25px" }}
								></i>
							</button>
						</div>
					);
				})}
			</section>

			<section className="add-a-product-section">
				<h3>Create Account</h3>
				<button
					onClick={() => {
						setUserInfo(defaultUserInfo);
						setDialogMode("create");
						dialogRef.current.showModal();
					}}
				>
					{" "}
					+
				</button>
			</section>
			<InputFormDialog
				title={getDialogContent().title}
				dialogRef={dialogRef}
				views={getDialogContent().views}
				submitFunc={getDialogContent().submitFunc}
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
					<button onClick={() => deleteAccount(deleteUid)}>
						Delete Account
					</button>
					<button
						onClick={() => {
							deleteAccountDialogRef.current.close();
						}}
					>
						Cancel
					</button>
				</div>
			</dialog>
		</section>
	);
}

export default Accounts;
