import { useEffect, useState } from "react";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";

function Headers() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div>{isMobile ? <HeaderMobile /> : <Header />}</div>
    </div>
  );
}

export default Headers;
