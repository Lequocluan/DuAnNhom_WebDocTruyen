import React from "react";
import Headers from "../components/header/Headers";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Headers />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
