import { fetchSingleCustomerFromFirestore } from "../Firebase/Customers";
import { getProductsByIDsFromFirestore } from "../Firebase/Products";

async function syncProducts(user) {
	try {
		const response = await fetch(
			process.env.REACT_APP_QUICKBOOKS_SYNC_PRODUCTS,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			},
		);
		return await response.json();
	} catch (error) {
		throw error;
	}
}

async function createInvoice(user, product) {
	try {
		const response = await fetch(
			process.env.REACT_APP_QUICKBOOKS_CREATE_INVOICE,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(product),
			},
		);
		return await response.json();
	} catch (error) {
		throw error;
	}
}

async function createQuickBooksInvoiceObject(order) {

	const lineItems = order.Products.map((product) => {
		return {
			DetailType: "SalesItemLineDetail",
			Amount: +( product.Quantity * product.UnitPrice).toFixed(2),
			Description: product.Description,
			SalesItemLineDetail: {
				ItemRef: {
					value: product.Id,
					name: product.Name,
				},
				Qty: product.Quantity,
				UnitPrice: product.UnitPrice,
				TaxCodeRef: { value: "TAX" },
			},
		};
	});

	const invoiceObject = {
		CustomerRef: {
			value: order.Customer.Id,
			name: order.Customer.DisplayName,
		},
		Line: lineItems,
		TxnDate: new Date().toISOString().split("T")[0],
		PrivateNote: "Generated from web order",
		BillEmail: { Address: order.Customer.Email },
	};

	return invoiceObject;
}

export { syncProducts, createInvoice, createQuickBooksInvoiceObject };
