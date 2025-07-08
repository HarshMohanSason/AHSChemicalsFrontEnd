import * as Sentry from "@sentry/react";

/**
 * Report error to sentry
 * @param error
 * @param context - optional
 * @returns void
 * @description This function is used to report errors to sentry in production. If in debug mode, it will print to console
 */
function reportError(error, context = {}) {
	if (process.env.NODE_ENV === "development") {
		console.error("[DEV ERROR]:", error, context);
	} else {
		Sentry.captureException(error, {
			extra: context,
		});
	}
}

export { reportError };
