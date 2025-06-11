/**
 * Helper class to represent the result of form validation in the Dialog Wizard
 * in a structured and consistent way for input dialog wizards.
 */
export class FormValidationResult {
	/**
	 * Creates an instance of FormValidationResult.
	 *
	 * @param {boolean} isValid - Indicates whether the form is valid.
	 * @param {any} [message=null] - Optional message or error details.
	 *                                Can be a string or an object depending on the validation context.
	 */
	constructor(isValid, message = null) {
		this.isValid = isValid;
		this.message = message;
	}

	/**
	 * Returns a valid result (no validation errors).
	 *
	 * @returns {FormValidationResult} A valid result object.
	 */
	static Valid() {
		return new FormValidationResult(true);
	}

	/**
	 * Returns an invalid result with a validation message or error details.
	 *
	 * @param {any} message - The error message or details (string, object, etc.).
	 * @returns {FormValidationResult} An invalid result object.
	 */
	static notValid(message) {
		return new FormValidationResult(false, message);
	}
}