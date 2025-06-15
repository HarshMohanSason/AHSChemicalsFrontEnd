/**
 * LoadingOverlayContext.js
 *
 * Provides global context for managing the application's loading overlay state.
 * Allows any component in the component tree to show or hide a global loading overlay.
 *
 * Example Usage:
 * import { useLoadingOverlayContext } from "../contexts/LoadingOverlayContext";
 * const { show, trigger, hide } = useLoadingOverlayContext();
 */

import { createContext, useContext } from "react";
import useLoadingOverlay from "../hooks/LoadingOverlay/LoadingOverlayHook";

// Create a new context for the loading overlay
const LoadingOverlayContext = createContext();

/**
 * LoadingOverlayProvider
 *
 * Wrap your application with this provider to enable global loading overlay control.
 * Internally uses a custom hook (useLoadingOverlay) to provide loading control methods.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will have access to the loading overlay context.
 */
export default function LoadingOverlayProvider({ children }) {
	const loadingOverlay = useLoadingOverlay(); // Contains { show, trigger, hide }

	return (
		<LoadingOverlayContext.Provider value={loadingOverlay}>
			{children}
		</LoadingOverlayContext.Provider>
	);
};

/**
 * useLoadingOverlayContext
 *
 * Custom hook to access the loading overlay context.
 * Returns the context value, which includes:
 * - show {boolean} : Whether the overlay is currently visible
 * - trigger {function} : Function to display the overlay
 * - hide {function} : Function to hide the overlay
 *
 * @returns {{ show: boolean, trigger: Function, hide: Function }}
 */
export const useLoadingOverlayContext = () => useContext(LoadingOverlayContext);