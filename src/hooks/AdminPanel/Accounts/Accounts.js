import { useState } from "react";
import { useAuth } from "../../../utils/firebase/AuthContext";
import { sendMail } from "../../../utils/SendMail";

const useAccounts = (showAlert) => {
	const { user } = useAuth();

	const [fetchedAccounts, setFetchedAccounts] = useState([]);
	const [fetchAccountsLoading, setFetchAccountsLoading] = useState(false);
	const [accountDialogLoading, setAccountDialogLoading] = useState(false);
	const [deleteAccountIDs, setDeleteAccountIDs] = useState([]);

	const createManagerAccount = async (userInfo) => {
		setAccountDialogLoading(true);
		try {
			if (user) {
				const response = await fetch(
					process.env.REACT_APP_CREATE_ACCOUNT,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify(userInfo),
					},
				);
				const responseText = await response.text();
				if (!response.ok) {
					throw new Error(responseText);
				}

				//Send the mail to let the user know tha account has been created.
				const mailData = {
					recipients: {
						[userInfo.email]: userInfo.name,
					},
					data: {
						name: userInfo.name,
						email: userInfo.email,
						password: userInfo.password,
					},
					template_id:
						process.env.REACT_APP_ACCOUNT_CREATED_TEMPLATE_ID,
				};
				await sendMail(mailData);
				showAlert(responseText, "Success");
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			setAccountDialogLoading(false);
		}
	};

	const fetchManagerAccounts = async () => {
		setFetchAccountsLoading(true);
		try {
			if (user) {
				const response = await fetch(
					process.env.REACT_APP_FETCH_ACCOUNTS,
					{
						method: "GET",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					},
				);
				const responseJson = await response.json();
				if (!response.ok) {
					throw new Error(responseJson.message);
				}
				setFetchedAccounts(responseJson);
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			setFetchAccountsLoading(false);
		}
	};

	const updateManagerAccount = async (userInfo) => {
		setAccountDialogLoading(true);
		try {
			if (user) {
				const response = await fetch(
					process.env.REACT_APP_UPDATE_ACCOUNT,
					{
						method: "PUT",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
						body: JSON.stringify(userInfo),
					},
				);
				const responseText = await response.text();
				if (!response.ok) {
					throw new Error(responseText);
				}
				setFetchedAccounts((prevAccounts) =>
					prevAccounts.map((acc) =>
						acc.uid === userInfo.uid
							? { ...acc, ...userInfo }
							: acc,
					),
				);
				showAlert(responseText, "Success");
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			setAccountDialogLoading(false);
		}
	};

	const deleteManagerAccount = async (userInfo) => {
		setDeleteAccountIDs((prev) => [...prev, userInfo.uid]);
		try {
			if (user) {
				const response = await fetch(
					`${process.env.REACT_APP_DELETE_ACCOUNT}?uid=${userInfo.uid}`,
					{
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
							Authorization: `Bearer ${user.token}`,
						},
					},
				);
				const responseText = await response.text();
				if (!response.ok) {
					throw new Error(responseText);
				}
				//Send the mail to let the user know tha account has been created.
				const mailData = {
					recipients: {
						[userInfo.email]: userInfo.displayName,
					},
					data: {
						name: userInfo.displayName,
						email: userInfo.email,
					},
					template_id:
						process.env.REACT_APP_ACCOUNT_DELETED_TEMPLATE_ID,
				};
				await sendMail(mailData);
				setFetchedAccounts((prev) =>
					prev.filter((account) => account.uid !== userInfo.uid),
				);
				showAlert(responseText, "Success");
			}
		} catch (error) {
			showAlert(error.message, "Error");
		} finally {
			setDeleteAccountIDs((prev) =>
				prev.filter((uid) => uid !== userInfo.uid),
			);
		}
	};

	return {
		createManagerAccount,
		updateManagerAccount,
		accountDialogLoading,
		fetchedAccounts,
		refetchAccounts: fetchManagerAccounts,
		fetchAccountsLoading,
		deleteManagerAccount,
		deleteAccountIDs,
	};
};

export default useAccounts;
