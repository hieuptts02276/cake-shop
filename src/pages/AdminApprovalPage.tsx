import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApprovalPage() {
  const navigate = useNavigate();

  const [approved, setApproved] =
    useState(false);

  const admin = JSON.parse(
    localStorage.getItem("currentUser") ||
      "null"
  );

  const pendingUser = JSON.parse(
    localStorage.getItem("pendingUser") ||
      "null"
  );

  if (
    !admin ||
    admin.role !== "admin"
  ) {
    navigate("/login");
    return null;
  }

  const approveUser = () => {
    const users = JSON.parse(
      localStorage.getItem("users") ||
        "[]"
    );

    users.push({
      ...pendingUser,
      pendingApproval: false
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    localStorage.removeItem(
      "pendingUser"
    );

    setApproved(true);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">

          {!approved ? (
            <>
              <h2>
                Yêu cầu phê duyệt tài khoản
              </h2>

              <div className="alert alert-warning">
                Tài khoản này dưới 13 tuổi.
                Admin cần chấp thuận trước
                khi tài khoản được tạo.
              </div>

              <p>
                <b>Họ tên:</b>{" "}
                {pendingUser.fullName}
              </p>

              <p>
                <b>Email:</b>{" "}
                {pendingUser.email}
              </p>

              <p>
                <b>Năm sinh:</b>{" "}
                {pendingUser.birthYear}
              </p>

              <button
                className="btn btn-success me-2"
                onClick={approveUser}
              >
                Chấp thuận
              </button>

              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem(
                    "pendingUser"
                  );

                  navigate("/");
                }}
              >
                Từ chối
              </button>
            </>
          ) : (
            <>
              <div className="alert alert-success">
                Admin đã chấp thuận tài
                khoản thành công.
              </div>

              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/login")
                }
              >
                Đến trang đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
