export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  name?: string;
}

export interface Order {
  id: number;
  userId: number;
  customerName: string;
  phone: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

class OrderService {
  private storageKey = "orders";

  private getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || "[]") as Order[];
  }

  getAll(): Order[] {
    return this.getOrders();
  }

  getByUser(userId: number): Order[] {
    const orders = this.getOrders();
    return orders.filter((o) => o.userId === userId);
  }

  create(order: Order): void {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  updateStatus(orderId: number, status: string): void {
    const orders = this.getOrders();
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  delete(orderId: number): void {
    const orders = this.getOrders();
    const updated = orders.filter((o) => o.id !== orderId);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  getRevenue(): number {
    const orders = this.getOrders();
    return orders.reduce((sum, order) => sum + order.total, 0);
  }
}

export default new OrderService();
