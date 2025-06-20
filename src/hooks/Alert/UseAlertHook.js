import { useState } from "react";

const useAlert = () => {
  const [isOpen, setIsAlertOpen] = useState(false);
  const [type, setAlertType] = useState("Error");
  const [message, setAlertMessage] = useState("");
  const [id, setAlertID] = useState(crypto.randomUUID());
  
  const showAlert = (message, type = "Error") => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertID(crypto.randomUUID());
    setIsAlertOpen(true);
  };

  return { isOpen, type, message, id, showAlert };
};

// Confirmation Alert Hook
const useConfirmationAlert = () => {
  const [isOpen, setIsConfirmationOpen] = useState(false);
  const [title, setConfirmationTitle] = useState("");
  const [text, setConfirmationText] = useState("");
  const [id, setAlertID] = useState(crypto.randomUUID());
  const [confirmFunc, setConfirmFunc] = useState(()=>{});
  const [confirmButtonText, setConfirmButtonText] = useState("Confirm");
  const [confirmButtonColor, setConfirmButtonColor] = useState("#d32f2f");

  const showAlert = (
    title = "Are you sure?",
    text = "",
    onConfirm,
    buttonText = "Confirm",
    buttonColor = "#d32f2f",
  ) => {
    setConfirmationTitle(title);
    setConfirmationText(text);
    setConfirmFunc(()=> onConfirm);
    setConfirmButtonText(buttonText);
    setConfirmButtonColor(buttonColor);
    setAlertID(crypto.randomUUID());
    setIsConfirmationOpen(true);
  };

  return {
    id,
    isOpen,
    title,
    text,
    confirmFunc,
    confirmButtonText,
    confirmButtonColor,
    showAlert,
  };
};

export { useAlert, useConfirmationAlert };
