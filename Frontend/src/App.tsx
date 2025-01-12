import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import SettingsLayout from "@/components/Layout/SettingsLayout";
import LoginPage from "@/pages/Auth/LoginPage";
import EmployeesPage from "@/pages/EmployeesPage";
import ClientsPage from "@/pages/ClientsPage";
import OrdersPage from "@/pages/OrdersPage";
import ProductsPage from "@/pages/ProductsPage";
import FinancePage from "@/pages/FinancePage";
import SignupPage from "@/pages/Auth/SignupPage";
import Profile from "@/pages/Settings/Profile";
import Appearance from "@/pages/Settings/Appearance";
import Messages from "@/pages/Settings/Messages";
import Account from "@/pages/Settings/Account";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="appearance" element={<Appearance />} />
          <Route path="account" element={<Account />} />
          <Route path="message" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
