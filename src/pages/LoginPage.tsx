import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
e.preventDefault();

const users = JSON.parse(localStorage.getItem("users") || "[]");

interface User {
  email: string;
  password: string;
  role: string;
  pendingApproval?: boolean;
}

const user = users.find(
  (u: User) => u.email === email && u.password === password
);

if (!user) {
  alert("Sai tài khoản hoặc mật khẩu");
  return;
}

if (user.pendingApproval) {
  alert("Tài khoản đang chờ Admin phê duyệt");
  return;
}

localStorage.setItem("currentUser", JSON.stringify(user));

if (user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/");
}

};

return ( <div className="container mt-5">
  <div className="card mx-auto shadow login-card"> <div className="card-body"> <h2 className="text-center mb-4">Đăng nhập</h2>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>

      <p className="mt-3 text-center">
        Chưa có tài khoản?
        <Link to="/register"> Đăng ký</Link>
      </p>
    </div>
  </div>
</div>


);
}
