import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";
import AlertProvider from "./contexts/AlertBoxContext";
import CartProvider from "./contexts/CartContext";
import AuthProvider from "./contexts/AuthContext";
import LoadingOverlayProvider from "./contexts/LoadingOverlayContext";
import FiltersProvider from "./contexts/FiltersContext";

Sentry.init({
  dsn: "https://d2a20b961a95a82ecad5fb8bdad7773c@o4509358074363904.ingest.us.sentry.io/4509358075609088",
  environment: "production",
  sendDefaultPii: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingOverlayProvider>
      <AlertProvider>
        <AuthProvider>
          <CartProvider>
            <FiltersProvider>
              <App />
            </FiltersProvider>
          </CartProvider>
        </AuthProvider>
      </AlertProvider>
    </LoadingOverlayProvider>
  </React.StrictMode>,
);

reportWebVitals();
