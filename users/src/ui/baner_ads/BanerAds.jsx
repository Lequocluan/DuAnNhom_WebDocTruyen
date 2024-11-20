import { useGlobalContext } from "../../context";
import Banner from "../../assets/images/banner_ads.jpg";
import "./banner.css";
import { useEffect, useState } from "react";

function BanerAds() {
  const { isBanerOpen, closeBanerAds } = useGlobalContext();
  const [secondsLeft, setSecondsLeft] = useState(15);

  useEffect(() => {
    if (isBanerOpen) {
      setSecondsLeft(15); // Reset lại khi mở banner
      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            closeBanerAds(); // Đóng banner khi đếm ngược về 0
            return 0;
          }
          return prev - 1; // Giảm 1 giây
        });
      }, 1000);

      return () => clearInterval(timer); // Dọn dẹp khi component unmount hoặc trạng thái thay đổi
    }
  }, [isBanerOpen, closeBanerAds]);

  return (
    <>
      {isBanerOpen && (
        <div className="overlay">
          <div className="banner-ads">
            <span className="ads_close">Ads in {secondsLeft}s</span>
            <button className="close-btn" onClick={() => closeBanerAds()}>
              ✖
            </button>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://shopee.vn/?uls_trackid=50svhu5f02cc&utm_campaign=id_AVSkuoPRhb&utm_content=----&utm_medium=affiliates&utm_source=an_17351500077&utm_term=bukw3751zd35&gad_source=1&gclid=CjwKCAiArva5BhBiEiwA-oTnXSYCyP4cV-cZDMMKjsq39Yculumi5njqBShHX_pWIK5M_rckpL5yDRoCo5AQAvD_BwE"
            >
              <img src={Banner} alt="Banner Ads" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default BanerAds;
