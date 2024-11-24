import { useState, useEffect } from "react";
import axios from "axios";
import "./banner.css";

function BanerAds() {
  const [isBanerOpen, closeBanerAds] = useState(true);
  const [adsBanner, setAdsBanner] = useState(null);

  useEffect(() => {
    axios
      .get("https://truyen.ntu264.vpsttt.vn/api/ads/random")
      .then((res) => {
        const bannerData = res.data.body?.data;
        setAdsBanner(bannerData);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!adsBanner) {
    return null;
  }

  const { link, picture } = adsBanner;

  return (
    <>
      {isBanerOpen && (
        <div className="overlay">
          <div className="banner-ads">
            <button className="close-btn" onClick={() => closeBanerAds(false)}>
              ✖
            </button>
            <a target="_blank" rel="noopener noreferrer" href={link}>
              <img src={picture?.path} alt={picture?.title || "Ad Banner"} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default BanerAds;
