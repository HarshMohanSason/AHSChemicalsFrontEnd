async function syncProducts(user) {
	try {
		const response = await fetch(
			process.env.REACT_APP_QUICKBOOKS_SYNC_PRODUCTS,
			{	method: "GET",
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
			{	method: "POST",
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(product)
			},
		);
		return await response.json();
	} catch (error) {
		throw error;
	}
}

export { syncProducts, createInvoice};
