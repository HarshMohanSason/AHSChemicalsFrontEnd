
export function extractFiltersFromProducts(products){
	if (!products || products.length === 0) {
		return {};
	}

	const brands = [...new Set(products.map((product)=> product.brandName))];
	const types = [...new Set(products.map((products)=> products.type))];

	return {
		Brand: brands, 
		Type: types,
	};
}