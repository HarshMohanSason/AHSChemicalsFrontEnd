import { useAlertContext } from "../../../contexts/AlertBoxContext";
import { handleFirebaseError } from "../../../utils/Firebase/ErrorHandler";
import { useAuth } from "../../../contexts/AuthContext";
import getGeneratedPurchaseOrder from "../../../utils/PdfGeneration/GeneratePurchaseOrder";
import { useEffect, useState } from "react";
import {
	fetchOrdersForAdmin,
	fetchOrdersForUser,
	updateOrderItemsInFirestore,
	updateOrderStatusInFirestore,
} from "../../../utils/Firebase/Orders";
import { isEqual } from "lodash";
import { uploadSingleFileToStorage } from "../../../utils/Firebase/FirebaseStorage";

export const useOrdersManagement = () => {
	const { alert } = useAlertContext();
	const { user } = useAuth();
	const [fetchedOrders, setFetchedOrders] = useState([]);
	const [isFetchingOrders, setIsFetchingOrders] = useState(false);
	const [filteredOrders, setFilteredOrders] = useState([]);

	const [minAmountFilter, setMinAmountFilter] = useState("");
	const [maxAmountFilter, setMaxAmountFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("PENDING");
	const [minDateFilter, setMinDateFilter] = useState("");
	const [maxDateFilter, setMaxDateFilter] = useState("");

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

	useEffect(() => {
		fetchOrders();
	}, [user]);

	const filterOrders = () => {
		const min = parseFloat(minAmountFilter) || 0;
		const max = parseFloat(maxAmountFilter) || Infinity;

		const filtered = fetchedOrders.filter((order) => {
			const matchStatus = !statusFilter || order.Status === statusFilter;
			const matchAmount = order.Total >= min && order.Total <= max;
			const matchDate =
				(!minDateFilter ||
					order.TimePlaced.toDate() >= new Date(minDateFilter)) &&
				(!maxDateFilter ||
					order.TimePlaced.toDate() <= new Date(maxDateFilter));
			return matchStatus && matchAmount && matchDate;
		});
		setFilteredOrders(filtered);
	};

	const updateOrderItemsAndGenerateNewPO = async (order) => {
		if (user) {
			try {
				let updatedOrder = getUpdatedOrderAmount(order);
				const blob = await getGeneratedPurchaseOrder(updatedOrder);
				const storageRef = `orders/${updatedOrder.id}`;
				const fileUrl = await uploadSingleFileToStorage(
					blob,
					storageRef,
				);
				updatedOrder = {
					...updatedOrder,
					purchase_order_url: fileUrl,
				};
				await updateOrderItemsInFirestore(updatedOrder);
				await fetchOrders();
			} catch (error) {
				throw error;
			}
		}
	};

	const getUpdatedOrderAmount = (order) => {
		const subtotal = order.items.reduce(
			(total, item) => total + item.quantity * item.price,
			0,
		);
		const taxRate = order.tax_rate / 100;
		const taxAmount = subtotal * taxRate;
		const totalAmount = subtotal + taxAmount;

		return {
			...order,
			subtotal: parseFloat(subtotal.toFixed(2)),
			total: parseFloat(totalAmount.toFixed(2)),
		};
	};

	const updateEditedOrder = async (oldOrder, newOrder) => {
		try {
			if (oldOrder.Status !== newOrder.Status) {
				await updateOrderStatusInFirestore(
					newOrder.Id,
					newOrder.Status,
				);
				await fetchOrders();
			}
		} catch (error) {
			alert.showAlert(handleFirebaseError(error.message), "Error");
		}
	};

	return {
		fetchedOrders,
		isFetchingOrders,
		filteredOrders,
		minAmountFilter,
		setMinAmountFilter,
		maxAmountFilter,
		setMaxAmountFilter,
		statusFilter,
		setStatusFilter,
		minDateFilter,
		setMinDateFilter,
		maxDateFilter,
		setMaxDateFilter,
		filterOrders,
		updateEditedOrder,
	};
};
