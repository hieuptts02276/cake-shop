import { useState } from "react";

interface Order {
  total: number;
}

export default function AdminDashboard() {
  const [userCount] = useState<number>(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.length;
  });

  const [cakeCount] = useState<number>(() => {
    const cakes = JSON.parse(localStorage.getItem("cakes") || "[]");
    return cakes.length;
  });

  const [orderCount] = useState<number>(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    return orders.length;
  });

  const [revenue] = useState<number>(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]") as Order[];
    return orders.reduce((sum, order) => sum + order.total, 0);
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 font-semibold mb-2">
            Người dùng
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {userCount}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 font-semibold mb-2">
            Bánh kem
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {cakeCount}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 font-semibold mb-2">
            Đơn hàng
          </h2>
          <p className="text-3xl font-bold text-orange-600">
            {orderCount}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 font-semibold mb-2">
            Doanh thu
          </h2>
          <p className="text-3xl font-bold text-red-600">
            {revenue.toLocaleString()}
            đ
          </p>
        </div>
      </div>
    </div>
  );
}