import { useEffect } from "react";
import SectionSearch from "../components/section_search/SectionSearch";

function Search() {
  useEffect(() => {
    document.title = "Tìm Kiếm";
  }, []);
  return (
    <>
      <SectionSearch />
    </>
  );
}

export default Search;
