import React, { useRef, useEffect } from "react";
import { useAlertContext } from "../../contexts/AlertBoxContext";
import styles from "./AlertBox.module.css";

const AlertBox = () => {
  const dialogRef = useRef(null);
  const { alert } = useAlertContext();

  useEffect(() => {
    if (alert.isOpen) {
      dialogRef.current?.showModal();
    }
  }, [alert.isOpen]);

  const getColor = () => {
    switch (alert.type) {
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
      <h3 style={{ color: getColor() }}>{alert.type}</h3>
      <p>{alert.message}</p>
      <button
        onClick={() => dialogRef.current?.close()}
        style={{ backgroundColor: getColor() }}
      >
        OK
      </button>
    </dialog>
  );
};

export default AlertBox;