function convertToGallons(size, unit) {
	const normalizedUnit = unit.toUpperCase();

	switch (normalizedUnit) {
		case "LBS":
		case "LB":
			// 1 gallon of water = 8.345 lbs
			return size / 8.345;

		case "OZ":
		case "OUNCES":
			// 1 pound = 16 ounces, so 1 gallon = 133.52 ounces
			return size / 133.52;

		default:
			//Just return the default size here
			return size;
	}
}
export {convertToGallons}
