import { useState, type ChangeEvent, type FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

type Role = "user" | "admin";

interface User {
  id: number;
  fullName: string;
  birthYear: number;
  email: string;
  password: string;
  role: Role;
  pendingApproval: boolean;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<Role>("user");

  const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
e.preventDefault();
const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

if (users.some((u) => u.email === email)) {
  alert("Email đã tồn tại");
  return;
}

const currentYear =
  new Date().getFullYear();

const age =
  currentYear -
  Number(birthYear);

if (age < 13) {
  const adminEmail = prompt(
    "Tài khoản này dưới 13 tuổi.\nNhập email Admin để xác nhận:"
  );

  const adminPassword = prompt(
    "Nhập mật khẩu Admin:"
  );

  if (
    !adminEmail ||
    !adminPassword
  ) {
    alert(
      "Chưa xác nhận bởi Admin"
    );
    return;
  }

  const admin = users.find(
    (u: User) =>
      u.role === "admin" &&
      u.email === adminEmail &&
      u.password ===
        adminPassword
  );

  if (!admin) {
    alert(
      "Thông tin Admin không hợp lệ"
    );
    return;
  }
}

const newUser = {
  id: Date.now(),
  fullName,
  birthYear: Number(birthYear),
  email,
  password,

  role,

  pendingApproval:
    role === "user" &&
    age < 13
};

users.push(newUser);

localStorage.setItem(
  "users",
  JSON.stringify(users)
);

if (age < 13) {
  alert(
    "Tài khoản đang chờ Admin phê duyệt vì dưới 13 tuổi."
  );
} else {
  alert("Đăng ký thành công");
}

navigate("/login");


};

return ( <div className="container mt-5">
<div className="card shadow mx-auto" style={{ maxWidth: 600 }}> <div className="card-body"> <h2 className="text-center mb-4">Đăng ký</h2>


      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-3"
          placeholder="Họ tên"
          value={fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Năm sinh"
          value={birthYear}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBirthYear(e.target.value)
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className="mb-3">
  <label htmlFor="role-select" className="form-label">
    Loại tài khoản
  </label>

  <select
    id="role-select"
    className="form-select"
    value={role}
    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
      setRole(
        e.target.value as
          | "user"
          | "admin"
      )
    }
  >
    <option value="user">
      Người dùng
    </option>

    <option value="admin">
      Quản trị viên
    </option>
  </select>
</div>
        <button className="btn btn-success w-100">
          Đăng ký
        </button>
      </form>
    </div>
  </div>
</div>
);
}
