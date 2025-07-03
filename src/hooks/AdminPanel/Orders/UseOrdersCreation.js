import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import { uploadSingleFileToStorage } from "../../../utils/Firebase/FirebaseStorage";
import { saveOrderDetailsInFirestore } from "../../../utils/Firebase/Orders";
import getGeneratedPurchaseOrder from "../../../utils/PdfGeneration/GeneratePurchaseOrder";
import { getTaxRate } from "../../../utils/TaxRate";

export const useOrdersCreation = () => {
	const { user } = useAuth();

	const createOrder = async (order) => {
		if (!order || !user) return;
		try {
			const subTotal = order.Items.reduce(
				(total, item) => total + item.Quantity * item.UnitPrice,
				0,
			);
			const taxRate = await getTaxRate(order.Customer.Property.Address.City);
			const tax = subTotal * taxRate;
			const total = subTotal + tax;
			const items = order.Items.map((item) => ({
				Id: item.Id,
				Quantity: item.Quantity,
			}));
			const orderData = {
				Uid: user.uid,
				TimePlaced: Timestamp.fromDate(new Date()),
				SpecialInstructions: order.SpecialInstructions,
				PropertyId: order.Customer.Id,
				SubTotal: subTotal,
				TaxRate: taxRate,
				TaxAmount: tax,
				Total: total,
				Items: items,
			};
			const orderId = await saveOrderDetailsInFirestore(orderData);
			return {Id: orderId, ...orderData}
		} catch (error) {
			throw error;
		}
	};

	const createPurchaseOrder = async (
		order
	) => {
		try {
			const blob = await getGeneratedPurchaseOrder(
				order
			);
			const storagePath = `orders/${order.Id}`;
			const fileUrl = await uploadSingleFileToStorage(blob, storagePath);
			order = {
				...order,
				PurchaseOrderURL: fileUrl,
			};
			await updateOrderItemsInFirestore
		} catch (error) {
			throw error;
		}
	};

	return {
		createOrder,
		createPurchaseOrder,
	};
};
