import React, { useEffect } from "react";

import { useState } from "react";
import Logo from "../../assets/images/logonew.png";
import Category from "./Category";
import { Data1, Data2 } from "./Data";

import LogoBrand from "./LogoBrand";
import DarkLight from "./DarkLight";
import FormSearch from "./FormSearch";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("user-token");
    if (storedToken) {
      setUser("Welcome back");
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-token"); // Xóa token
    setUser(null); // Đặt lại state user
    toast.success("Logged out successfully!");
    navigate("/login"); // Điều hướng về trang login
  };

  const handleToggle = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };
  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar navbar-expand-lg navbar-dark header__navbar p-md-0">
        <div className="container">
          <LogoBrand Logo={Logo} />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Category
                title="Thể loại"
                data={Data1}
                isOpen={openDropdown === "category1"}
                onToggle={() => handleToggle("category1")}
              />
              <Category
                title="Theo số chương"
                data={Data2}
                isOpen={openDropdown === "category2"}
                onToggle={() => handleToggle("category2")}
              />
            </ul>

            <div className="form-check form-switch me-3 d-flex align-items-center">
              <DarkLight />
            </div>

            <FormSearch />
            <div className="d-flex gap-3 justify-content-center align-items-center ms-4 ">
              {user ? (
                <div className="d-flex gap-3 align-items-center">
                  <span className="text-light">Welcome, guy!</span>{" "}
                  {/* Hiển thị email thay vì tên */}
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-3 justify-content-center align-items-center ms-4">
                  <Link
                    to="/login"
                    className="text-decoration-none fs-6 fs-5 text-light"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="text-decoration-none fs-6 fs-5 text-light"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
