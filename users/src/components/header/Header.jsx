import React, { useEffect, useRef } from "react";

import { useState } from "react";
import Logo from "../../assets/images/logo_story_new.png";
import Category from "./Category";
import { Data2 } from "./Data";

import LogoBrand from "./LogoBrand";
import DarkLight from "./DarkLight";
import FormSearch from "./FormSearch";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context";

function Header() {
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const [userName, setUserName] = useState(""); // State lưu tên người dùng
  const [role, setRole] = useState(0);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { dataCetegory } = useGlobalContext();
  const [updateToggle, setUpdateToggle] = useState(false);
  const timeoutRef = useRef(null);

  // console.log("User name: ", userName);

  useEffect(() => {
    const storedToken = localStorage.getItem("user-token");
    if (storedToken) {
      setUser("Welcome back");

      const fetchUserProfile = async () => {
        try {
          const response = await fetch(
            "https://truyen.ntu264.vpsttt.vn/api/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${storedToken}`,
                Accept: "application/json",
              },
            }
          );
          const data = await response.json();
          if (data.status === 200) {
            setUserName(data.body.data.name);
            setRole(data.body.data.role);
          } else {
            toast.error("Failed to fetch user profile.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
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

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setUpdateToggle(false);
    }, 200);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setUpdateToggle(true);
  };

  const handleUpdateUser = () => {
    const storedToken = localStorage.getItem("user-token");
    if (storedToken) {
      const update = async () => {
        try {
          const response = await fetch(
            "https://truyen.ntu264.vpsttt.vn/api/payment/create",
            {
              method: "POST",
              body: JSON.stringify({
                action: "update_user",
                amount: 10000,
                redirect_url: window.location.href,
              }),
              headers: {
                Authorization: `Bearer ${storedToken}`,
                Accept: "application/json",
                "Content-Type": "application/json", // Bắt buộc khi gửi JSON
              },
            }
          );
          const data = await response.json();
          if (data.status === 200) {
            const url = data.body.data.payUrl;
            window.location.href = url;
          } else {
            toast.error("Failed to fetch user profile.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      update();
    }
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

          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ marginRight: "0px" }}
            >
              <Category
                title="Thể loại"
                dataCetegory={dataCetegory}
                isOpen={openDropdown === "category1"}
                onToggle={() => handleToggle("category1")}
              />
              <Category
                title="Theo số chương"
                dataCetegory={dataCetegory}
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
                  <div className="flex gap-2 items-center relative">
                    <div className="text-light">
                      Welcome,{" "}
                      <span
                        className="cursor-pointer font-bold capitalize"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          color: "#00C0FF",
                          fontSize: "18px",
                        }}
                      >
                        {userName || "User"}
                      </span>
                    </div>
                    {role == 1 && (
                      <div className="text-blue-500 font-bold border-blue-500 border-2 rounded-lg px-3 py-1">
                        Admin
                      </div>
                    )}
                    {role == 2 && (
                      <div className="text-yellow-500 font-bold border-yellow-500 border-2 rounded-lg px-3 py-1">
                        VIP
                      </div>
                    )}

                    {updateToggle && role <= 0 ? (
                      <div
                        className="rounded-md absolute bg-white p-2 top-full translate-y-1 shadow-md left-1/2 -translate-x-1/2 w-56 flex items-center justify-center"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button
                          onClick={handleUpdateUser}
                          className="text-yellow-500 font-bold border-yellow-500 border-2 rounded-lg px-3 py-1"
                        >
                          Nâng cấp thành viên VIP
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* Hiển thị email thay vì tên */}
                  <button
                    className="btn btn-danger"
                    style={{ fontWeight: "bold" }}
                    onClick={handleLogout}
                  >
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
