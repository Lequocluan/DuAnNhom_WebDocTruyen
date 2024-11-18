import React, { useEffect, useState } from "react";
import Headers from "../components/header/Headers";
import { Outlet } from "react-router-dom";
import HeaderBottom from "../components/header/HeaderBottom";
import Footer from "../components/footer/Footer";
import ScrollUp from "../components/scroll_up/ScrollUp";
import Loader from "./loader/Loader";

function AppLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Headers />
      <HeaderBottom />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}

export default AppLayout;
