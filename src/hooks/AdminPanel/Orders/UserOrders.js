import { useAlertContext } from "../../../contexts/AlertBoxContext";
import {
	handleFirebaseError,
	saveOrderDetailsToFirestore,
	uploadSingleFileToStorage,
} from "../../../utils/firebase/firebase_utility";
import { useAuth } from "../../../contexts/AuthContext";
import getGeneratedPurchaseOrder from "../../../utils/PdfGeneration/GeneratePurchaseOrder";
import { useEffect, useState } from "react";
import {
	fetchOrdersForAdmin,
	fetchOrdersForUser,
} from "../../../utils/firebase/orders";

export const useOrders = () => {
	const { alert } = useAlertContext();
	const { user } = useAuth();
	const [fetchedOrders, setFetchedOrders] = useState([]);
	const [isFetchingOrders, setIsFetchingOrders] = useState(false);
	const [filteredOrders, setFilteredOrders] = useState([]);

	const placeOrder = async (order) => {
		if (user) {
			try {
				const blob = await getGeneratedPurchaseOrder(order);
				const fileUrl = await uploadSingleFileToStorage(
					blob,
					"orders",
					order.id,
					"purchase_order",
				);
				order = { ...order, purchase_order_url: fileUrl };
				await saveOrderDetailsToFirestore(order);
			} catch (error) {
				alert.showAlert(handleFirebaseError(error), "Error");
			}
		}
	};

	const fetchOrders = async () => {
		setIsFetchingOrders(true);
		try {
			if (user) {
				let orders = [];
				if (user.isAdmin) {
					orders = await fetchOrdersForAdmin();
				} else {
					orders = await fetchOrdersForUser(user.uid);
				}
				setFetchedOrders(orders);
				setFilteredOrders(orders);
			}
		} catch (error) {
			alert.showAlert(handleFirebaseError(error), "Error");
		} finally {
			setIsFetchingOrders(false);
		}
	};

	const filterOrdersByOrderStatus = (status) => {
		const filtered = fetchedOrders.filter((order) => order.status === status);
		setFilteredOrders(filtered);
	};

	const filterOrdersByPaymentStatus = (paymentStatus) => {
		const filtered = fetchedOrders.filter(
			(order) => order.payment_status === paymentStatus,
		);
		setFilteredOrders(filtered);
	};

	const filterOrdersByAcceptStatus = (acceptStatus) => {
		const filtered = fetchedOrders.filter(
			(order) => order.accept_status === acceptStatus,
		);
		setFilteredOrders(filtered);
	};

	const filterOrdersByAmountGreaterThan = (amount) => {
		const filtered = fetchedOrders.filter(
			(order) => order.totalAmount >= amount,
		);
		setFilteredOrders(filtered);
	};

	useEffect(() => {
		fetchOrders();
	}, [user]);

	return { placeOrder, fetchedOrders, isFetchingOrders };
};
