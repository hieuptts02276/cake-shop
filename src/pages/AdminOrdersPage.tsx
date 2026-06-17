import { useState } from "react";

interface Order {
  id: number;
  customerName: string;
  total: number;
  status: string;
}

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem("orders") || "[]";
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
    } catch {
      return [];
    }
  });

  const updateStatus = (
    id: number,
    status: string
  ) => {
    const updated = orders.map((o) =>
      o.id === id
        ? { ...o, status }
        : o
    );
    localStorage.setItem(
      "orders",
      JSON.stringify(updated)
    );
    setOrders(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Quản Lý Đơn Hàng
      </h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">
              Mã Đơn
            </th>
            <th className="border border-gray-300 p-2">
              Khách Hàng
            </th>
            <th className="border border-gray-300 p-2">
              Tổng Tiền
            </th>
            <th className="border border-gray-300 p-2">
              Trạng Thái
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">
                {order.id}
              </td>
              <td className="border border-gray-300 p-2">
                {order.customerName}
              </td>
              <td className="border border-gray-300 p-2">
                {order.total.toLocaleString()}
                đ
              </td>
              <td className="border border-gray-300 p-2">
                <select
                  aria-label={`Trạng thái đơn ${order.id}`}
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.id, e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Đang xử lý">
                    Đang xử lý
                  </option>
                  <option value="Đang làm bánh">
                    Đang làm bánh
                  </option>
                  <option value="Đang giao">
                    Đang giao
                  </option>
                  <option value="Hoàn thành">
                    Hoàn thành
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
