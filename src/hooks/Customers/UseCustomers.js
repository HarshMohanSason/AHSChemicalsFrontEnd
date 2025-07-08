import { useCallback, useEffect, useState } from "react";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import { useAuth } from "../../contexts/AuthContext";
import { useLoadingOverlayContext } from "../../contexts/LoadingOverlayContext";
import {
	fetchAllCustomersFromFirestore,
	fetchProductPricesForCustomersFromFirestore,
    updateCustomerProductPrice,
} from "../../utils/Firebase/Customers";
import { handleFirebaseError } from "../../utils/Firebase/ErrorHandler";
import { beginQuickBooksAuth } from "../../utils/Quickbooks/Auth";
import { syncCustomers } from "../../utils/Quickbooks/Customers";

const useCustomers = () => {
	const { alert } = useAlertContext();
	const { user } = useAuth();
	const loadingOverlay = useLoadingOverlayContext();

	const [customers, setCustomers] = useState([]);
	const [formattedCustomersForDisplay, setFormattedCustomersForDisplay] =
		useState([]);
	const [productPrices, setProductPrices] = useState(null);
	const fetchCustomers = useCallback(async () => {
		if (!user) return;
		try {
			if (user) {
				const fetchedCustomers =
					await fetchAllCustomersFromFirestore(user);
				setCustomers(fetchedCustomers);
			}
		} catch (error) {
			alert.showAlert(handleFirebaseError(error.message), "Error");
		}
	}, [user]);

	useEffect(() => {
		fetchCustomers();
	}, [fetchCustomers]);

	const beginCustomersSync = async () => {
		loadingOverlay.trigger();
		try {
			if (user) {
				// Attempt to sync customers from QuickBooks
				const responseJson = await syncCustomers(user);

				// If sync was successful
				if (responseJson.code === 200) {
					await fetchCustomers(); // Refresh customers from Firestore
					alert.showAlert(
						"Customers synced successfully with QuickBooks",
						"Success",
					);
					return;
				}

				// If the issue is not authentication-related, show the error
				if (responseJson.code !== 401) {
					throw new Error(responseJson.message);
				}

				// If session expired, prompt re-authentication with QuickBooks
				if (responseJson.code === 401) {
					alert.showAlert(
						"QuickBooks session was logged out, logging into QuickBooks again. Try syncing again once QuickBooks is authenticated.",
						"Warning",
					);
					await beginQuickBooksAuth(user);
				}
			}
		} catch (error) {
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const getFormattedCustomersForDisplay = async () => {
		try {
			const response = await fetch(
				"/assets/ca_svg_county_circle_pos.json",
			);
			const svgData = await response.json();

			const mapped = customers.map((customer) => {
				const Id = customer.Id;
				const Address = customer.BillAddr ?? customer.ShipAddr;
				const City = Address?.City?.toUpperCase() ?? "UNKNOWN";
				const svgInfo = svgData[City] || {};
				const County = svgInfo.County ?? "UNKNOWN";
				const svg_circle_x_pos = svgInfo.Svg_X_Pos ?? null;
				const svg_circle_y_pos = svgInfo.Svg_Y_Pos ?? null;

				return {
					Id,
					Property: {
						Name:
							customer.DisplayName ||
							customer.CompanyName ||
							"N/A",
						Address: {
							...Address,
							County,
						},
						Phone: customer?.PrimaryPhone?.FreeFormNumber,
					},
					svg_circle_x_pos,
					svg_circle_y_pos,
				};
			});
			setFormattedCustomersForDisplay(mapped);
		} catch (error) {
			setFormattedCustomersForDisplay([]); // fallback
		}
	};

	useEffect(() => {
		if (customers.length > 0) {
			getFormattedCustomersForDisplay();
		}
	}, [customers]);

	const syncProductProductPricesForCustomers = async () => {
		loadingOverlay.trigger();
		try {
			if (user) {
				// Attempt to sync customers from QuickBooks
				const response = await fetch(
					process.env.REACT_APP_SYNC_PRODUCT_PRICES,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					},
				);

				const responseJson = await response.json();
				if (!response.ok) {
					throw new Error(responseJson.message);
				}
				alert.showAlert(responseJson.message, "Success");
			}
		} catch (error) {
			alert.showAlert(error.message, "Error");
		} finally {
			loadingOverlay.hide();
		}
	};

	const fetchProductPricesForCustomers = async () => {
		loadingOverlay.trigger();
		if (productPrices) return;
		if (customers.length > 0) {
			try {
				const fetchedPrices =
					await fetchProductPricesForCustomersFromFirestore(
						customers,
					);
				setProductPrices({
					data: fetchedPrices.data,
					lastDoc: fetchedPrices.lastDocument,
				});
			} catch (error) {
				alert.showAlert(handleFirebaseError(error), "Error");
			} finally {
				loadingOverlay.hide();
			}
		}
	};

	const updateProductPrice = async (id, price) => {
		loadingOverlay.trigger();
		try {
			await updateCustomerProductPrice(id, price);
		} catch (error) {
			alert.showAlert(handleFirebaseError(error));
		} finally {
			loadingOverlay.hide();
		}
	};
	return {
		customers,
		beginCustomersSync,
		formattedCustomersForDisplay,
		syncProductProductPricesForCustomers,
		fetchProductPricesForCustomers,
		productPrices,
		updateProductPrice,
	};
};

export default useCustomers;
