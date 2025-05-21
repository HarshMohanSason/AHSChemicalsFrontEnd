import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./utils/firebase/AuthContext";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://d2a20b961a95a82ecad5fb8bdad7773c@o4509358074363904.ingest.us.sentry.io/4509358075609088",
  environment: 'production',
  sendDefaultPii: true
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
