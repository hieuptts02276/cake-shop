interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  createdAt: string;
  status: string;
  total: number;
  items: OrderItem[];
}

interface User {
  id: string;
}

export default function OrdersPage() {
  const orders: Order[] = (() => {
    try {
      const currentUser: User = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );

      const allOrders: Order[] = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      if (!currentUser?.id) return [];

      return allOrders.filter((o: Order) => o.userId === currentUser.id);
    } catch {
      return [];
    }
  })();

  return (
    <div className="orders-container">
      <h1>Đơn Hàng Của Tôi</h1>
      
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h3>Mã đơn: {order.id}</h3>
          </div>

          <div className="order-info">
            <p>
              <strong>Ngày tạo:</strong>
              {order.createdAt}
            </p>
          </div>

          <div className="order-info">
            <p>
              <strong>Trạng thái:</strong>
              <span className={`status-${order.status}`}>
                {order.status}
              </span>
            </p>
          </div>

          <div className="order-info">
            <p>
              <strong>Tổng tiền:</strong>
              {order.total.toLocaleString()}
              đ
            </p>
          </div>

          <div className="order-items">
            <h4>Sản phẩm:</h4>

            <ul>
              {order.items.map((item: OrderItem) => (
                <li key={item.id}>
                  - {item.name} x{item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
