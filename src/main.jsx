import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./state/AppContext.jsx";

// if ("serviceWorker" in navigator) {
//  window.addEventListener("load", () => {
//    navigator.serviceWorker.register("/sw.js").catch(console.error);
//  });
//}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
