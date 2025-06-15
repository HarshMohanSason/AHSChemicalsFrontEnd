/**
 * AlertBoxContext.js
 *
 * Provides global context for managing alert boxes and confirmation alerts across the application.
 * Uses custom hooks `useAlert` and `useConfirmationAlert` for handling alert logic.
 * 
 * Example Usage:
 * 
 * // In a component
 * import { useAlertContext } from "../contexts/AlertBoxContext";
 * const { alert, confirmationAlert } = useAlertContext();
 * 
 * alert.show("This is a simple alert");
 * confirmationAlert.show("Are you sure?", onConfirmCallback);
 */

import { createContext, useContext } from "react";
import { useAlert, useConfirmationAlert } from "../hooks/Alert/UseAlertHook";

// Create the context for alerts
const AlertContext = createContext();

/**
 * AlertProvider
 *
 * Wrap this provider around your application to enable the use of global alert and confirmation alerts.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components that will have access to the alert context.
 */
export default function AlertProvider({ children }) {
  const alert = useAlert();
  const confirmationAlert = useConfirmationAlert();

  return (
    <AlertContext.Provider value={{ alert, confirmationAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlertContext = () => useContext(AlertContext);