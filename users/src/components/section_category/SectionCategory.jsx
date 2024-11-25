import { useEffect, useState } from "react";
import SectionCategoryItem from "./SectionCategoryItem";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../ui/Pagination";

function SectionCategory() {
  const [loading, setIsLoading] = useState(true);
  const { slugCategory } = useParams();
  const [novels, setNovels] = useState([]);
  const [nameCategory, setNameCategory] = useState(null);
  const [description, setDescription] = useState("");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const perPage = 1;
  const indexOfLastPage = currentPage * perPage;
  const indexOfFirstPage = indexOfLastPage - perPage;

  useEffect(() => {
    let isMounted = true;

    axios
      .post(
        `https://truyen.ntu264.vpsttt.vn/api/category/novel/${slugCategory}`
      )
      .then((res) => {
        if (isMounted) {
          setNovels(res.data.body.data);
          setIsLoading(false);
          setNameCategory(res.data.body.category);
          setDescription(res.data.body.description);
        }
      })
      .catch((err) => {
        console.error("Error fetching category data:", err),
          setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slugCategory]);

  //! Cập nhật title website
  useEffect(() => {
    if (nameCategory) {
      document.title = `Truyện online.vn - Đọc truyện thể loại ${nameCategory} hay nhất`;
    }
  }, [nameCategory]);

  // useEffect(() => {
  //   console.log(novels)
  // }, [novels])

  if (loading) {
    return (
      <div className="container">
        <h4>Loading category...</h4>
      </div>
    );
  }

  if (!Array.isArray(novels) || novels.length === 0) {
    return (
      <div className="container">
        <h4>Không có thể loại truyện này.</h4>
      </div>
    );
  }

  const cleanDescription = description
    ? description.replace(/<p>/g, "<span>").replace(/<\/p>/g, "</span>")
    : "Mô tả không có sẵn.";
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          {/* SECTION CATEGORY LIST */}
          <div className="col-12 col-md-8 col-lg-9 mb-3">
            <div className="head-title-global d-flex justify-content-between mb-2">
              <div className="col-12 col-md-12 col-lg-12 head-title-global__left d-flex">
                <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                  <span
                    href="#"
                    className="d-block text-decoration-none text-dark fs-4 category-name"
                    title="Ngôn Tình"
                  >
                    Thể Loại Truyện: {nameCategory}
                  </span>
                </h2>
              </div>
            </div>
            <div className="list-story-in-category section-stories-list">
              {novels
                .slice(indexOfFirstPage, indexOfLastPage)
                .map((novel, index) => (
                  <div key={novel.id}>
                    <SectionCategoryItem key={index} {...novel} />
                  </div>
                ))}
            </div>
            <div className="mt-5">
              {novels.length > perPage && (
                <Pagination
                  totalItems={novels.length}
                  itemsPerPage={perPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
          {/* SECTION CATEGORY DESCRIPTION */}
          <div className="col-12 col-md-4 col-lg-3 sticky-md-top">
            <div className="category-description bg-light p-2 rounded mb-3 card-custom">
              <p className="mb-0 text-secondary"></p>

              <p
                dangerouslySetInnerHTML={{
                  __html: cleanDescription,
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionCategory;
