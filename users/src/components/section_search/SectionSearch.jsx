import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "../../ui/Pagination";
import StoryItem from "./SectionStoryItem";
import AuthorItem from "./SectionAuthorItem";

function SectionSearch() {
  const { search } = useLocation();
  const [novels, setNovels] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const queryParams = new URLSearchParams(search);
  const keyword = queryParams.get("keyword");

  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const perPage = 24;
  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;

  useEffect(() => {
    const pageFromUrl = parseInt(queryParams.get("page")) || 1;
    setCurrentPage(pageFromUrl);
  }, [search]);

  useEffect(() => {
    if (keyword) {
      axios
        .get(
          `https://truyen.ntu264.vpsttt.vn/api/search?q=${encodeURIComponent(
            keyword
          )}`
        )
        .then((res) => {
          setNovels(res.data.body.data.novels);
          setAuthors(res.data.body.data.authors);
          setIsLoading(false);
        })
        .catch((err) => console.error("Error fetching search results:", err));
    } else {
      setIsLoading(false);
    }
  }, [keyword]);

  if (loading) {
    return (
      <div className="container">
        <h4>Đang tìm kiếm...</h4>
      </div>
    );
  }

  if (novels.length === 0) {
    return (
      <div className="container">
        <h4>Không tìm thấy kết quả nào cho "{keyword}".</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-3xl font-bold">
            Kết quả tìm kiếm cho "{keyword}"
          </h2>
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex flex-col">
              {novels.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-6 justify-center">
                    {novels
                      .slice(indexOfFirstPage, indexOfLastPage)
                      .map((item) => (
                        <div key={item.id}>
                          <StoryItem data={item} />
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
            {novels.length > perPage && (
              <Pagination
                totalItems={novels.length}
                itemsPerPage={perPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                keyword={keyword}
              />
            )}
            <div className="">
              {authors.length > 0 && (
                <>
                  <div className="mb-2 text-2xl">Tác giả</div>
                  <div className="flex flex-wrap gap-6">
                    {authors.map((author) => (
                      <div className="" key={author.id}>
                        <AuthorItem {...author} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionSearch;
