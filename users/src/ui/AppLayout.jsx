import React from "react";
import Headers from "../components/header/Headers";
import { Outlet } from "react-router-dom";
import HeaderBottom from "../components/header/HeaderBottom";
import Footer from "../components/footer/Footer";
import Loader from "./Loader";

function AppLayout() {
  return (
    <>
      {/* <Loader /> */}
      <Headers />
      <HeaderBottom />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
