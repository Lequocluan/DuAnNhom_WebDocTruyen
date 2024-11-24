import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>404 - Không tìm thấy trang</h1>
        <p>Trang bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/" className="btn btn-primary">
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default Error;
