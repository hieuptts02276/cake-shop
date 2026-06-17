import { useState } from "react";

type User = {
  id: number;
  fullName: string;
  email: string;
  birthYear: number;
  pendingApproval: boolean;
};

export default function AdminApprovalPage() {
  const [users, setUsers] = useState<User[]>(() => {
    const data = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    return data.filter((u) => u.pendingApproval === true);
  });

  const loadUsers = () => {
    const data = JSON.parse(localStorage.getItem("users") || "[]") as User[];

    setUsers(data.filter((u) => u.pendingApproval === true));
  };

  const approveUser = (userId: number) => {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]") as User[];

    const updated = allUsers.map((u) =>
      u.id === userId
        ? {
            ...u,
            pendingApproval: false,
          }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updated));

    loadUsers();
  };

  const rejectUser = (userId: number) => {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]") as User[];

    const updated = allUsers.filter((u) => u.id !== userId);

    localStorage.setItem("users", JSON.stringify(updated));

    loadUsers();
  };

  return (
    <div>
      <h1>Duyệt Tài Khoản Dưới 13 Tuổi</h1>
      <table>
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Năm Sinh</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4}>Không có tài khoản cần duyệt.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.birthYear}</td>
                <td>
                  <button type="button" onClick={() => approveUser(user.id)}>
                    Chấp thuận
                  </button>
                  <button type="button" onClick={() => rejectUser(user.id)}>
                    Từ chối
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
