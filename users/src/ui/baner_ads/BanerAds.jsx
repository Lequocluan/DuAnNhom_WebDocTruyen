import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import img11 from "../../assets/images/diu_dang_tan_xuong.jpg";

import axios from "axios";
import "./banner.css";

function BannerAds() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [adsBanner, setAdsBanner] = useState(null);
  const location = useLocation();

  const isAdVisible = () =>
    ["/category/", "/truyen-chu/", "/truyen-tranh/"].some((path) =>
      location.pathname.includes(path)
    ) || /^\/[^/]+\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    if (!isAdVisible()) return;

    axios
      .get("https://truyen.ntu264.vpsttt.vn/api/ads/random")
      .then((res) => {
        const bannerData = res.data.body?.data;
        setAdsBanner(bannerData || {});
      })
      .catch((err) => console.error("Error fetching banner ads:", err));
  }, [location]);

  if (!adsBanner || !isAdVisible() || !isBannerOpen) {
    return null;
  }

  const { link, picture } = adsBanner;

  return (
    <div className="banner-ads-right" style={{ zIndex: "9090" }}>
      <button className="close-btn" onClick={() => setIsBannerOpen(false)}>
        ✖
      </button>
      <a target="_blank" rel="noopener noreferrer" href={link || "#"}>
        <img
          src={picture?.path || "img11"}
          alt={picture?.title || "Ads"}
          className="img-fluid"
        />
      </a>
    </div>
  );
}

export default BannerAds;
