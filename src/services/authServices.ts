export interface User {
id: number;
fullName: string;
birthYear: number;
email: string;
password: string;
role: "admin" | "user";
pendingApproval: boolean;
}

class AuthService {
register(user: User) {
const users: User[] = JSON.parse(
localStorage.getItem("users") || "[]"
);
const existed = users.find(
  (u) => u.email === user.email
);

if (existed) {
  throw new Error("Email đã tồn tại");
}

users.push(user);

localStorage.setItem(
  "users",
  JSON.stringify(users)
);

return user;

}

login(
email: string,
password: string
) {
const users: User[] = JSON.parse(
localStorage.getItem("users") || "[]"
);
const user = users.find(
  (u) =>
    u.email === email &&
    u.password === password
);

if (!user) {
  throw new Error(
    "Sai email hoặc mật khẩu"
  );
}

if (user.pendingApproval) {
  throw new Error(
    "Tài khoản đang chờ Admin phê duyệt"
  );
}

localStorage.setItem(
  "currentUser",
  JSON.stringify(user)
);

return user;

}

logout() {
localStorage.removeItem(
"currentUser"
);
}

getCurrentUser() {
return JSON.parse(
localStorage.getItem(
"currentUser"
) || "null"
);
}

getAllUsers() {
return JSON.parse(
localStorage.getItem("users") || "[]"
);
}

approveUser(id: number) {
const users: User[] = JSON.parse(
localStorage.getItem("users") || "[]"
);

const updated = users.map(
  (user) =>
    user.id === id
      ? {
          ...user,
          pendingApproval:
            false
        }
      : user
);

localStorage.setItem(
  "users",
  JSON.stringify(updated)
);

}

deleteUser(id: number) {
const users: User[] = JSON.parse(
localStorage.getItem("users") || "[]"
);

const updated = users.filter(
  (u) => u.id !== id
);

localStorage.setItem(
  "users",
  JSON.stringify(updated)
);
}
}

export default new AuthService();
