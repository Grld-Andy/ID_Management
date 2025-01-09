import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import EmployeeContextProvider from "./context/employeeContext/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <EmployeeContextProvider>
        <App />
      </EmployeeContextProvider>
    </BrowserRouter>
  </StrictMode>
);
