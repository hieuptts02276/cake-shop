import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  price?: number;
  quantity?: number;
}

export default function CheckoutPage(): React.ReactElement {
  const navigate = useNavigate();

  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleCheckout = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!Array.isArray(cart) || cart.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const total = cart.reduce(
      (sum: number, item: CartItem) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

    const order = {
      id: Date.now(),
      userId: currentUser?.id ?? null,
      customerName: currentUser?.fullName ?? "",
      phone,
      address,
      items: cart,
      total,
      status: "Đang xử lý",
      createdAt: new Date().toLocaleString(),
    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Đặt hàng thành công");
    navigate("/orders");
  };

  return (
    <div className="checkout-page">
      <h2>Thanh Toán</h2>

      <div className="checkout-field">
        <label htmlFor="checkout-address">Địa chỉ giao hàng</label>
        <br />
        <input
          id="checkout-address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ giao hàng"
          className="checkout-input"
        />
      </div>

      <div className="checkout-field">
        <label htmlFor="checkout-phone">Số điện thoại</label>
        <br />
        <input
          id="checkout-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
          className="checkout-input"
        />
      </div>

      <button type="button" onClick={handleCheckout} className="checkout-button">
        Xác nhận đặt hàng
      </button>
    </div>
  );
}
