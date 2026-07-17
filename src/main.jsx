import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// La app ya no usa service worker; se desregistra el que instalaban versiones anteriores
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registros) =>
      registros.forEach((registro) => registro.unregister()),
    );
}
