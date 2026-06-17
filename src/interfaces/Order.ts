export interface OrderItem {
cakeId: number;

cakeName: string;

quantity: number;

price: number;

subtotal: number;
}

export type OrderStatus =
| "Đang xử lý"
| "Đang làm bánh"
| "Đang giao"
| "Hoàn thành";

export interface Order {
id: number;

userId: number;

customerName: string;

phone: string;

address: string;

items: OrderItem[];

total: number;

status: OrderStatus;

createdAt: string;
}
