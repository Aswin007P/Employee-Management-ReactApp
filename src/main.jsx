import "./index.css";
import App from "./App.jsx";
import Employee from "./Employee.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Employee />
  </StrictMode>,
)
