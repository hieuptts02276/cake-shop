import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PendingCheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PendingCheckout {
  age: number;
  total: number;
  items: PendingCheckoutItem[];
}

export default function ApprovalPage() {
  const navigate = useNavigate();

  const [approved, setApproved] = useState(false);

  const admin = JSON.parse(
    localStorage.getItem("currentUser") ||
      "null"
  );

  const pendingUser = JSON.parse(
    localStorage.getItem("pendingUser") ||
      "null"
  );

  const pendingCheckout = JSON.parse(
    localStorage.getItem("pendingCheckout") ||
      "null"
  ) as PendingCheckout | null;

  if (
    !admin ||
    admin.role !== "admin"
  ) {
    navigate("/login");
    return null;
  }

  if (!pendingUser && !pendingCheckout) {
    navigate("/");
    return null;
  }

  const approveRequest = () => {
    if (pendingUser) {
      const users = JSON.parse(
        localStorage.getItem("users") ||
          "[]"
      );

      users.push({
        ...pendingUser,
        pendingApproval: false,
      });

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );
      localStorage.removeItem("pendingUser");
    }

    if (pendingCheckout) {
      localStorage.removeItem("pendingCheckout");
    }

    setApproved(true);
  };

  const rejectRequest = () => {
    if (pendingUser) {
      localStorage.removeItem("pendingUser");
    }

    if (pendingCheckout) {
      localStorage.removeItem("pendingCheckout");
    }

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          {!approved ? (
            <>
              {pendingUser ? (
                <>
                  <h2>Yêu cầu phê duyệt tài khoản</h2>

                  <div className="alert alert-warning">
                    Tài khoản này dưới 13 tuổi. Admin cần chấp thuận trước khi tài khoản được tạo.
                  </div>

                  <p>
                    <b>Họ tên:</b> {pendingUser.fullName}
                  </p>

                  <p>
                    <b>Email:</b> {pendingUser.email}
                  </p>

                  <p>
                    <b>Năm sinh:</b> {pendingUser.birthYear}
                  </p>
                </>
              ) : (
                <>
                  <h2>Yêu cầu phê duyệt thanh toán</h2>

                  <div className="alert alert-warning">
                    Khách hàng dưới 13 tuổi cần admin chấp nhận trước khi thanh toán.
                  </div>

                  <p>
                    <b>Tuổi khách hàng:</b> {pendingCheckout?.age}
                  </p>

                  <p>
                    <b>Tổng đơn hàng:</b> {pendingCheckout?.total.toLocaleString()} đ
                  </p>

                  <div className="mb-3">
                    <b>Sản phẩm:</b>
                    <ul className="list-group mt-2">
                      {pendingCheckout?.items.map((item) => (
                        <li key={item.id} className="list-group-item p-2">
                          {item.name} - {item.quantity} x {item.price.toLocaleString()} đ
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <button
                className="btn btn-success me-2"
                onClick={approveRequest}
              >
                Chấp thuận
              </button>

              <button
                className="btn btn-danger"
                onClick={rejectRequest}
              >
                Từ chối
              </button>
            </>
          ) : (
            <>
              <div className="alert alert-success">
                Admin đã chấp thuận yêu cầu thành công.
              </div>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                Đến trang chủ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
