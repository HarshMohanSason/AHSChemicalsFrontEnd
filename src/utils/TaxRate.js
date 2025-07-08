const DEFAULT_TAX_RATE = 0.0825;

/**
 * Get the tax rate for a given city
 * @param {string} city
 * @returns {Promise<number>}
 */
async function getTaxRate(city) {
	try {
		const response = await fetch("/assets/ca_city_tax_rates.json");
		const data = await response.json();
		const cityKey = city.toUpperCase();
		return data[cityKey].Rate ?? DEFAULT_TAX_RATE;
	} catch (error) {
		reportError(error, {
			"city": city
		})
		return DEFAULT_TAX_RATE;
	}
}

export { getTaxRate };
