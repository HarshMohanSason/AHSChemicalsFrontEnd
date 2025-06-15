import { useState } from "react";
import { useAlertContext } from "../../../contexts/AlertBoxContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useLoadingOverlayContext } from "../../../contexts/LoadingOverlayContext";
import { sendMail } from "../../../utils/SendMail";

const useAccounts = () => {
	const { user } = useAuth();
	const {alert} = useAlertContext()
	const loadingOverlay = useLoadingOverlayContext()
	const [fetchedAccounts, setFetchedAccounts] = useState([]);

	const createManagerAccount = async (userInfo) => {
		loadingOverlay.trigger();
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
				alert.showAlert(responseText, "Success");
			}
		} catch (error) {
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const fetchManagerAccounts = async () => {
		loadingOverlay.trigger()
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
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide()
		}
	};

	const updateManagerAccount = async (userInfo) => {
		loadingOverlay.trigger();
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
				alert.showAlert(responseText, "Success");
			}
		} catch (error) {
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const deleteManagerAccount = async (userInfo) => {
		loadingOverlay.trigger();
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
				alert.showAlert(responseText, "Success");
			}
		} catch (error) {
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	return {
		createManagerAccount,
		updateManagerAccount,
		fetchedAccounts,
		refetchAccounts: fetchManagerAccounts,
		deleteManagerAccount,
	};
};

export default useAccounts;
