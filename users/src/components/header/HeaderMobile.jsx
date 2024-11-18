import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logonew.png";
import { Data3 } from "./Data";
import DarkLight from "./DarkLight";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context";
import Category from "./Category";

function HeaderMobile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { dataCetegory } = useGlobalContext();

  useEffect(() => {
    const storedToken = localStorage.getItem("user-token");
    if (storedToken) {
      setUser("Welcome back");
      setIsLoggedIn(true);
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

  useEffect(() => {
    // Khi trạng thái isLoggedIn thay đổi, đảm bảo không có overflow: hidden
    if (isLoggedIn) {
      document.body.style.overflow = "auto"; // Khôi phục lại trạng thái cuộn khi đăng nhập thành công
      document.body.style.paddingRight = "";
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleToggle = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };
  return (
    <>
      <div className="d-sm-block d-lg-none">
        <nav
          className={`navbar navbar-dark bg-dark header_mobile ${
            isScrolled ? "scrolled" : ""
          }`}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                src={Logo}
                alt="Logo Suu Truyen"
                className="img-fluid"
                style={{ width: "200px" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark w-75"
              tabIndex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              {/* LOGO */}
              <div className="offcanvas-header">
                <img
                  src={Logo}
                  alt="Logo Suu Truyen"
                  className="img-fluid"
                  style={{ width: "200px" }}
                />
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              {/* LOGO */}

              <div className="offcanvas-body">
                {/* THỂ LOẠI */}
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mb-3">
                  {/* <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Thể loại
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-custom"
                      aria-labelledby="navbarDropdown"
                    >
                      {dataCetegory.map((data) => {
                        return (
                          <li style={{ cursor: "pointer" }} key={data.id}>
                            <Link
                              className="dropdown-item"
                              to={`/category/${data.id}`}
                            >
                              {data.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li> */}
                  <Category
                    title="Thể loại"
                    dataCetegory={dataCetegory}
                    isOpen={openDropdown === "category1"}
                    onToggle={() => handleToggle("category1")}
                  />
                </ul>
                {/* THỂ LOẠI */}

                <div className="form-check form-switch d-flex align-items-center mb-3 p-0">
                  <DarkLight />
                </div>

                <form
                  className="d-flex header__form-search mt-4"
                  action=""
                  method="GET"
                >
                  <input
                    className="form-control search-story"
                    type="text"
                    placeholder="Tìm kiếm"
                    name="key_word"
                  />
                  <div className="col-12 search-result shadow no-result d-none">
                    <div className="card text-white bg-light">
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush d-none">
                          <li className="list-group-item">
                            <a href="#" className="text-dark hover-title">
                              Tự cẩm
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button className="btn" type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    </svg>
                  </button>
                </form>

                {/* Phần đăng nhập/đăng xuất */}
                {isLoggedIn ? (
                  <div className="d-flex flex-column gap-3 mt-4">
                    <span className="text-light">Welcome back, guy!</span>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="d-flex gap-3 flex-column mt-3">
                    <Link
                      to="/login"
                      className="text-decoration-none text-light fs-5"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="text-decoration-none text-light fs-5"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default HeaderMobile;
