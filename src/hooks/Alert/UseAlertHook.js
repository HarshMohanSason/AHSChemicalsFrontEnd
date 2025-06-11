import { useState } from "react";

const useAlert = () => {
  
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("Error");
  const [alertMessage, setErrorMessage] = useState("");
  const [alertId, setAlertId] = useState(crypto.randomUUID());
  const showAlert = (message, type = "Error") => {
    setErrorMessage(message);
    setAlertType(type);
    setIsAlertOpen(true);
    setAlertId(crypto.randomUUID())
  };

  return { isAlertOpen, alertType, alertMessage, showAlert, alertId};
}

// Confirmation Alert Hook
const useConfirmationAlert = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationFunc, setConfirmationFunc] = useState(() => () => {});
  const [confirmationId, setConfirmationId] = useState(crypto.randomUUID());
  const [confirmButtonText, setConfirmButtonText] = useState("Confirm");
  const [confirmButtonColor, setConfirmButtonColor] = useState("#d32f2f");

  const showConfirmationAlert = (
    title = "Are you sure?",
    text = "",
    onConfirm = () => {},
    buttonText = "Confirm",
    buttonColor = "#d32f2f",
    ) => {
    setConfirmationTitle(title);
    setConfirmationText(text);
    setConfirmationFunc(() => onConfirm);
    setConfirmButtonText(buttonText);
    setConfirmButtonColor(buttonColor);
    setIsConfirmationOpen(true);
    setConfirmationId(crypto.randomUUID());
  };

  return {
    isConfirmationOpen,
    confirmationTitle,
    confirmationText,
    confirmationFunc,
    confirmButtonText,
    confirmButtonColor,
    showConfirmationAlert,
    confirmationId,
  };
};

export { useAlert, useConfirmationAlert };