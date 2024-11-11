import React from "react";
import Headers from "../components/header/Headers";
import { Outlet } from "react-router-dom";
import HeaderBottom from "../components/header/HeaderBottom";

function AppLayout() {
  return (
    <>
      <Headers />
      <HeaderBottom />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
