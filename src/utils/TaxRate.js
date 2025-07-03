const DEFAULT_TAX_RATE = 0.0825;

async function getTaxRate(city) {
	try {
		const response = await fetch("/assets/ca_city_tax_rates.json");
		const data = await response.json();

		// Use uppercase for consistent lookup
		const cityKey = city.toUpperCase();

		return data[cityKey].Rate ?? DEFAULT_TAX_RATE;
	} catch (error) {
		return DEFAULT_TAX_RATE;
	}
}

export {getTaxRate}
