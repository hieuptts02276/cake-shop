export type UserRole =
| "admin"
| "user";

export interface User {
id: number;

fullName: string;

birthYear: number;

email: string;

password: string;

phone?: string;

address?: string;

role: UserRole;

pendingApproval: boolean;

createdAt?: string;
}
