import React from "react";
import { Link } from "react-router-dom";
function LogoBrand({ Logo }) {
  return (
    <>
      <Link to="/" className="navbar-brand">
        <img
          src={Logo}
          alt="Logo Suu Truyen"
          className="img-fluid"
          style={{ width: "200px" }}
        />
      </Link>
    </>
  );
}

export default LogoBrand;
