import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Cake Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          title="Toggle navigation"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbar"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Trang chủ
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cart"
              >
                Giỏ hàng
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/orders"
              >
                Đơn hàng
              </Link>
            </li>

            {currentUser?.role ===
              "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin/cakes"
                  >
                    Bánh Kem
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin/orders"
                  >
                    Đơn Hàng
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin/approvals"
                  >
                    Duyệt User
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex">
            {currentUser ? (
              <>
                <span className="text-white me-3">
                  {currentUser.fullName}
                </span>

                <button
                  className="btn btn-light"
                  onClick={logout}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-light me-2"
                  to="/login"
                >
                  Đăng nhập
                </Link>

                <Link
                  className="btn btn-warning"
                  to="/register"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}