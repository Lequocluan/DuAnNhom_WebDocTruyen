import React from "react";

import Header from "../components/header/Header";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
