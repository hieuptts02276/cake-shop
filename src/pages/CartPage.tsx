import { useState} from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const data = localStorage.getItem("cart");
    return (data ? JSON.parse(data) : []) as CartItem[];
  });
  const [customerAge, setCustomerAge] = useState("");
  const [adminApproved, setAdminApproved] = useState(false);

  const ageNumber = Number(customerAge);
  const requiresAdminApproval =
    customerAge !== "" && ageNumber > 0 && ageNumber < 13;

  const handleAgeChange = (value: string) => {
    setCustomerAge(value);

    const ageNumber = Number(value);
    if (value === "" || ageNumber <= 0 || ageNumber >= 13) {
      setAdminApproved(false);
    }
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: quantity < 1 ? 1 : quantity,
          }
        : item
    );

    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const requestAdminApproval = () => {
    if (!requiresAdminApproval) {
      return;
    }

    window.alert("Yêu cầu phê duyệt quản trị đã được gửi. Vui lòng chờ admin xác nhận.");
    setAdminApproved(true);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      window.alert(
        "Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán."
      );
      return;
    }

    if (requiresAdminApproval && !adminApproved) {
      window.alert(
        "Đối với khách hàng dưới 13 tuổi, cần phải có xác nhận của admin trước khi thanh toán."
      );
      return;
    }

    localStorage.removeItem("cart");
    setCart([]);
    setCustomerAge("");
    setAdminApproved(false);
    window.alert(`Thanh toán thành công! Tổng: ${total.toLocaleString()} đ`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Giỏ Hàng</h1>

      <div className="mb-6">
        <label htmlFor="customer-age" className="block font-medium mb-2">
          Tuổi khách hàng
        </label>
        <input
          id="customer-age"
          type="number"
          min="1"
          value={customerAge}
          onChange={(e) => handleAgeChange(e.target.value)}
          className="w-32 px-3 py-2 border rounded"
          placeholder="Nhập tuổi"
        />
        {requiresAdminApproval && (
          <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
            Khách hàng dưới 13 tuổi cần xác nhận admin để thanh toán.
          </div>
        )}
        {requiresAdminApproval && adminApproved && (
          <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded text-sm">
            Đã gửi yêu cầu phê duyệt admin. Có thể tiến hành thanh toán.
          </div>
        )}
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Bánh</th>
              <th className="border p-2 text-left">Giá</th>
              <th className="border p-2 text-left">SL</th>
              <th className="border p-2 text-left">Tổng</th>
              <th className="border p-2 text-left">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">
                  <span>{item.price.toLocaleString()}</span>
                </td>
                <td className="border p-2">
                  <label htmlFor={`quantity-${item.id}`} className="sr-only">
                    Số lượng {item.name}
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="w-16 px-2 py-1 border"
                  />
                </td>
                <td className="border p-2">
                  <span>{(item.price * item.quantity).toLocaleString()}</span>
                </td>
                <td className="border p-2">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mb-6">
        <h2 className="text-xl font-bold">
          Thành tiền:
          <span className="text-green-600 ml-2">{total.toLocaleString()} đ</span>
        </h2>
      </div>

      <div className="flex gap-4 justify-end">
        <Link
          to="/"
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Tiếp tục mua
        </Link>
        {requiresAdminApproval && !adminApproved ? (
          <button
            type="button"
            onClick={requestAdminApproval}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            Yêu cầu xác nhận admin
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={requiresAdminApproval && !adminApproved}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
