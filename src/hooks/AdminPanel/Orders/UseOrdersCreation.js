import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchSingleCustomerFromFirestore } from "../../../utils/Firebase/Customers";
import { uploadSingleFileToStorage } from "../../../utils/Firebase/FirebaseStorage";
import {
	saveOrderDetailsInFirestore,
	updateOrderItemsInFirestore,
} from "../../../utils/Firebase/Orders";
import { getProductsByIDsFromFirestore } from "../../../utils/Firebase/Products";
import getGeneratedPurchaseOrderBlob from "../../../utils/PdfGeneration/GeneratePurchaseOrder";
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
			const taxRate = await getTaxRate(
				order.Customer.Property.Address.City,
			);
			const tax = subTotal * taxRate;
			const total = subTotal + tax;
			const items = order.Items.map((item) => ({
				Id: item.Id,
				Quantity: item.Quantity,
			}));
			const orderData = {
				Uid: user.uid,
				Status: "PENDING",
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
			return { Id: orderId, ...orderData };
		} catch (error) {
			throw error;
		}
	};

	const createPurchaseOrder = async (order) => {
		try {
			const blob = await getGeneratedPurchaseOrderBlob(order);
			const storagePath = `orders/${order.PlacedOrder.Id}/purchase_order`;
			const fileUrl = await uploadSingleFileToStorage(blob, storagePath);
			await updateOrderItemsInFirestore(order.PlacedOrder.Id, {
				PurchaseOrderURL: fileUrl,
			});
		} catch (error) {
			throw error;
		}
	};

	/* Creates an object with three keys
		{PlacedOrder: , 
		 Customer: ,
		 Products:
		}
	*/
	const createMappedCustomerAndProductOrder = async (order) => {
		const customerRef = await fetchSingleCustomerFromFirestore(
			order.PropertyId,
		);

		const productIdToQtyMap = new Map();
		order.Items.forEach((item) => {
			productIdToQtyMap.set(item.Id, item.Quantity);
		});
		const products = await getProductsByIDsFromFirestore([
			...productIdToQtyMap.keys(),
		]);

		const mappedProducts = products.map((product) => ({
			...product,
			Quantity: productIdToQtyMap.get(product.Id),
		}));
		return {
			PlacedOrder: order,
			Customer: customerRef,
			Products: mappedProducts,
		};
	};

	return {
		createOrder,
		createPurchaseOrder,
		createMappedCustomerAndProductOrder,
	};
};
