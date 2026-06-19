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
  const [showAdminApproval, setShowAdminApproval] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const handleAdminApprovalLogin = () => {
    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const admin = users.find(
      (u) =>
        u.role === "admin" &&
        u.email === adminEmail &&
        u.password === adminPassword
    );

    if (!admin) {
      alert("Tài khoản Admin không hợp lệ");
      return;
    }

    if (!pendingUser) {
      alert("Không tìm thấy tài khoản cần duyệt");
      return;
    }

    localStorage.setItem(
      "pendingUser",
      JSON.stringify(pendingUser)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(admin)
    );

    alert("Admin đăng nhập thành công");
    navigate("/approval");
  };

  const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      alert("Email đã tồn tại");
      return;
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - Number(birthYear);

    const newUser: User = {
      id: Date.now(),
      fullName,
      birthYear: Number(birthYear),
      email,
      password,
      role,
      pendingApproval: role === "user" && age < 13
    };

    if (age < 13 && role === "user") {
      setPendingUser(newUser);
      setShowAdminApproval(true);
      return;
    }

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Đăng ký thành công");
    navigate("/login");
  };

  if (showAdminApproval) {
    return (
      <div className="container mt-5">
        <div className="card shadow mx-auto" style={{ maxWidth: 500 }}>
          <div className="card-body">
            <h3 className="text-center">Xác nhận của Admin</h3>

            <p className="text-danger">
              Người dùng dưới 13 tuổi cần
              Admin xác nhận trước khi tạo
              tài khoản.
            </p>

            <input
              className="form-control mb-3"
              placeholder="Email Admin"
              value={adminEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAdminEmail(e.target.value)
              }
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Mật khẩu Admin"
              value={adminPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAdminPassword(e.target.value)
              }
            />

            <button
              className="btn btn-primary w-100"
              onClick={handleAdminApprovalLogin}
            >
              Đăng nhập Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

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
  className="form-control mb-1"
  placeholder="Năm sinh"
  value={birthYear}
  onChange={(e: ChangeEvent<HTMLInputElement>) =>
    setBirthYear(e.target.value)
  }
  required
/>

{/* Cảnh báo luôn hiển thị khi vào trang */}
<p className="text-danger small mt-1">
  Người dùng dưới 13 tuổi cần có sự xác nhận của Admin trước khi tạo tài khoản. 
  Xem thêm chi tiết tại{" "}
  <a href="/age-requirements" className="text-decoration-underline">
    trang yêu cầu độ tuổi
  </a>.
</p>

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
