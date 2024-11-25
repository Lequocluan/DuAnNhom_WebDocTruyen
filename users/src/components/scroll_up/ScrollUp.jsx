import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./scrollup.css";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        className="scroll-up-btn flex justify-center items-center"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <AiOutlineArrowUp />
      </button>
    )
  );
};

export default ScrollUp;
