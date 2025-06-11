import React, { useRef } from "react";
import styles from "./AlertBox.module.css";

/**
 * AlertBox Component
 *
 * This component renders a modal alert dialog using the native `<dialog>` element.
 * It displays a message with a status type (e.g., Error, Success, Warning), and provides
 * a button to close the dialog.
 *
 * Props:
 * @param {string} message - The message to display in the alert box. Default is "an error occurred".
 * @param {boolean} isOpen - Controls whether the dialog should be opened. When true, dialog is shown.
 * @param {string} type - The type of alert to show: "Success", "Error", or "Warning". Affects the color.
 *
 * Behavior:
 * - Uses the HTML `dialog` element with `showModal()` for native modal support.
 * - Dynamically styles the heading and button color based on the `type` prop.
 *
 * Usage:
 * <AlertBox
 *   message="Product added successfully"
 *   isOpen={isAlertVisible}
 *   type="Success"
 * />
 *
 * Notes:
 * - This component should be mounted in the DOM even when not open, to ensure `ref` works correctly.
 * - Automatically closes with an "OK" button, calling `dialogRef.current?.close()`.
 */

const AlertBox = ({
  message = "an error occurred",
  isOpen,
  type = "Error",
}) => {
  const dialogRef = useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);
  
  const getColor = () => {
    switch (type) {
      case "Success":
        return "green";
      case "Error":
        return "red";
      case "Warning":
        return "orange";
      default:
        return "gray";
    }
  };
  return (
    <dialog ref={dialogRef} className={styles.alertDialog}>
      <h3 style={{color: getColor()}}>{type}</h3>
      <p>{message}</p>
      <button onClick={()=>dialogRef.current?.close()} style={{backgroundColor: getColor()}}>OK</button>
    </dialog>
  );
};

export default AlertBox;