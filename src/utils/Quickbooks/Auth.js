async function beginQuickBooksAuth(user) {
	try {
		const response = await fetch(
			process.env.REACT_APP_QUICKBOOKS_AUTH_BEGIN,
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
		//Open a new window with the returned url for the callback cloud function
		window.open(responseJson.data.authUrl, "_blank", "noopener,noreferrer");
	} catch (error) {
		throw error;
	}
}

export { beginQuickBooksAuth };
