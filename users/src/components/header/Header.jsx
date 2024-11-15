import React from "react";

import { useState } from "react";
import Logo from "../../assets/images/logo_text.png";
import Category from "./Category";
import { Data1, Data2 } from "./Data";

import LogoBrand from "./LogoBrand";
import DarkLight from "./DarkLight";
import FormSearch from "./FormSearch";

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };
  return (
    <header className="header d-none d-lg-block">
      <nav className="navbar navbar-expand-lg navbar-dark header__navbar p-md-0">
        <div className="container">
          <LogoBrand Logo={Logo} />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
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
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
