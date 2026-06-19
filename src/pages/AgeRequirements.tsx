import React from "react";
import { Link } from "react-router-dom";

const containerStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.6",
};

const headingStyle: React.CSSProperties = {
  color: "#2c3e50",
};

const AgeRequirements: React.FC = () => {
  return (
    <div className="container mt-5" style={containerStyle}>
      <div className="card shadow mx-auto" style={{ maxWidth: "800px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Quy định &amp; Chính sách của Cake Shop</h2>

          <p>
            Để mang đến trải nghiệm tốt nhất cho khách hàng, Cake Shop áp dụng các quy định rõ ràng
            về chất lượng sản phẩm, dịch vụ và quyền lợi khách hàng. Những chính sách này giúp đảm bảo
            sự minh bạch, an toàn và hài lòng cho tất cả mọi người khi mua sắm tại cửa hàng.
          </p>

          <h4 className="mt-4" style={headingStyle}>1. Chất lượng sản phẩm</h4>
          <p>
            Tất cả các loại bánh đều được làm từ nguyên liệu tươi mới, đảm bảo vệ sinh an toàn thực phẩm.
            Chúng tôi cam kết không sử dụng chất bảo quản độc hại và luôn kiểm tra kỹ lưỡng trước khi giao hàng.
          </p>

          <h4 className="mt-4" style={headingStyle}>2. Đặt hàng &amp; giao hàng</h4>
          <p>
            Khách hàng có thể đặt bánh trực tiếp tại cửa hàng hoặc thông qua website.
            Đơn hàng sẽ được xác nhận qua email hoặc điện thoại.
            Chúng tôi hỗ trợ giao hàng tận nơi trong khu vực nội thành.
          </p>
          <ul>
            <li>Đơn hàng cần được đặt trước ít nhất 24 giờ với bánh thiết kế đặc biệt.</li>
            <li>Phí giao hàng sẽ được thông báo rõ ràng trước khi xác nhận đơn.</li>
            <li>Khách hàng có thể theo dõi trạng thái đơn hàng trực tuyến.</li>
          </ul>

          <h4 className="mt-4" style={headingStyle}>3. Chính sách đổi trả</h4>
          <p>
            Nếu sản phẩm bị lỗi do quá trình sản xuất hoặc vận chuyển, khách hàng có quyền yêu cầu đổi trả.
            Cake Shop sẽ xử lý nhanh chóng để đảm bảo quyền lợi của khách hàng.
          </p>

          <h4 className="mt-4" style={headingStyle}>4. Ưu đãi &amp; thành viên</h4>
          <p>
            Khách hàng thân thiết sẽ được hưởng các ưu đãi đặc biệt như giảm giá, tích điểm và quà tặng.
            Chúng tôi khuyến khích khách hàng đăng ký tài khoản để theo dõi lịch sử mua hàng và nhận ưu đãi.
          </p>

          <h4 className="mt-4" style={headingStyle}>5. Thông tin thêm</h4>
          <p>
            Chính sách có thể được điều chỉnh theo thời gian để phù hợp với nhu cầu thực tế.
            Khách hàng nên thường xuyên kiểm tra lại để nắm bắt các thay đổi mới nhất.
          </p>

          <h4 className="mt-4" style={headingStyle}>6. Yêu cầu độ tuổi</h4>
          <p>
            Để đảm bảo an toàn cho người dùng, Cake Shop quy định rằng
            <strong> khách hàng dưới 13 tuổi</strong> cần có sự xác nhận của
            <strong> Admin</strong> trước khi tạo tài khoản.
          </p>
          <ul>
            <li>Tài khoản sẽ được đưa vào trạng thái <em>chờ phê duyệt</em>.</li>
            <li>Admin có quyền từ chối hoặc yêu cầu thêm thông tin để đảm bảo an toàn.</li>
            <li>Người dùng từ 13 tuổi trở lên có thể đăng ký và sử dụng dịch vụ bình thường.</li>
          </ul>
          <p>
            Quy định này nhằm tuân thủ các chuẩn mực bảo vệ trẻ em trên môi trường mạng và đảm bảo trải nghiệm an toàn cho tất cả khách hàng.
          </p>

          <Link to="/register" className="btn btn-primary w-100 mt-4">
            Quay lại trang đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgeRequirements;
