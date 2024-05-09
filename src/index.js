import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import App from "../App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { CacheProvider } from "./Components/CacheContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CacheProvider>
      <App />
    </CacheProvider>
  </React.StrictMode>
);

reportWebVitals();
