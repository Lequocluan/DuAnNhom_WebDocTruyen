import React, { useEffect, useState } from "react";
import Headers from "../components/header/Headers";
import { Outlet } from "react-router-dom";
import HeaderBottom from "../components/header/HeaderBottom";
import Footer from "../components/footer/Footer";
import ScrollUp from "../components/scroll_up/ScrollUp";
import Loader from "./loader/Loader";
import BanerAds from "./baner_ads/BanerAds";

function AppLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <BanerAds />
      <Headers />
      <HeaderBottom />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}

export default AppLayout;
