import React, { useEffect, useState } from "react";
import Headers from "../components/header/Headers";
import { Outlet, useLocation } from "react-router-dom";
import HeaderBottom from "../components/header/HeaderBottom";
import Footer from "../components/footer/Footer";
import ScrollUp from "../components/scroll_up/ScrollUp";
import Loader from "./loader/Loader";
import BanerAds from "./baner_ads/BanerAds";

function AppLayout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isBannerVisible = () =>
    ["/category/", "/truyen-chu/", "/truyen-tranh/"].some((path) =>
      location.pathname.includes(path)
    ) || /^\/[^/]+\/[^/]+$/.test(location.pathname);

  const showBanner =
    location.pathname.includes("/category/") ||
    location.pathname.includes("/truyen-chu/") ||
    location.pathname.includes("/truyen-tranh/") ||
    /^\/[^/]+\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {showBanner && <BanerAds />}
      <Headers />
      <HeaderBottom />
      {isBannerVisible() && <BanerAds />}
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
      <ScrollUp />
    </>
  );
}

export default AppLayout;
