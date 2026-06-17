import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CakeDetailPage from "./pages/CakeDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

import AdminDashboard from "./pages/AdminDashboard";
import AdminCakePage from "./pages/AdminCakePage";
import AdminOrderPage from "./pages/AdminOrdersPage";
import AdminApprovalPage from "./pages/AdminApprovalPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cake/:id" element={<CakeDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cakes" element={<AdminCakePage />} />
        <Route path="/admin/orders" element={<AdminOrderPage />} />
        <Route path="/admin/approvals" element={<AdminApprovalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
