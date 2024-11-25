import { useEffect } from "react";
import SectionDetails from "../components/section_details/SectionDetails";

function Details() {
  useEffect(() => {
    document.title = "Truyện online.vn";
  }, []);
  return (
    <>
      <SectionDetails />
    </>
  );
}

export default Details;
