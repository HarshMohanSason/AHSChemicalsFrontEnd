import React, { useRef } from "react";
import "../styles/components/AlertBox.css";

export const AlertBox = ({
  message = "an error occurred",
  isOpen,
  isClose,
  type = "Error",
}) => {
  const dialogRef = useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
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
    <dialog ref={dialogRef} className="alert-dialog">
      <h3 style={{color: getColor()}}>{type}</h3>
      <p>{message}</p>
      <button onClick={isClose} style={{backgroundColor: getColor()}}>OK</button>
    </dialog>
  );
};
