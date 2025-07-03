async function syncCustomers(user) {
	try {
		const response = await fetch(
			process.env.REACT_APP_QUICKBOOKS_SYNC_CUSTOMERS,
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
export {syncCustomers}
