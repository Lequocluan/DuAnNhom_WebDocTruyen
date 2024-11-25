import React, { useEffect } from "react";
import SectionIndex from "../components/section_index/SectionIndex";

function Home() {
  useEffect(() => {
    document.title = "Truyện online.vn";
  }, []);
  return (
    <>
      <SectionIndex />
    </>
  );
}

export default Home;
