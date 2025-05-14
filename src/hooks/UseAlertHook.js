import { useState } from "react";

export default function useAlert() {
  
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("Error");
  const [errorMessage, setErrorMessage] = useState("");

  const showAlert = (message, type = "Error") => {
    setErrorMessage(message);
    setAlertType(type);
    setIsAlertOpen(true);
  };

  const closeAlert = () => setIsAlertOpen(false);

  return { isAlertOpen, alertType, errorMessage, showAlert, closeAlert };

}