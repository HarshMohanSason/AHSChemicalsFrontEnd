/**
 * Converts a string to Title Case
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 * @example toTitleCase('hello world');
 * // 'Hello World'
 */
function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

export { toTitleCase };
