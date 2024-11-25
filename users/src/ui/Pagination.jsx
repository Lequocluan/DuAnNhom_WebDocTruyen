import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  keyword = null,
}) {
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [inputPage, setInputPage] = useState("");
  const [isChangePage, setIsChangePage] = useState(false);

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(value) && value <= totalPages && value > 0) {
      setInputPage(value);
    }
  };

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page > 0 && page <= totalPages) {
      updatePageInUrl(page);
      onPageChange(page);
    }
  };

  const toggleChangePage = () => {
    setIsChangePage(!isChangePage);
  };

  const updatePageInUrl = (page) => {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.set("keyword", keyword);
    queryParams.set("page", page);
    navigate(`?${queryParams.toString()}`);
  };

  const handlePageChange = (page) => {
    updatePageInUrl(page);
    onPageChange(page);
  };

  return (
    <div className="pagination mt-3 d-flex justify-content-center align-items-center">
      <button
        className={`btn ${
          currentPage === 1 ? "btn-light" : "btn-primary"
        } mx-1 flex justify-center items-center`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft /> Đầu
      </button>

      {currentPage > 1 && (
        <button
          className="btn btn-light mx-1"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}

      <button className="btn btn-primary mx-1">{currentPage}</button>

      {currentPage < totalPages && (
        <button
          className="btn btn-light mx-1"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage < totalPages - 1 && (
        <button
          className="btn btn-light mx-1"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      <button
        className={`btn ${
          currentPage === totalPages ? "btn-light" : "btn-primary"
        } mx-1 flex justify-center items-center`}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Cuối <FaAngleRight />
      </button>

      <form onSubmit={handlePageSubmit} className="ms-3 d-flex">
        <div className="flex flex-col gap-2">
          {isChangePage && (
            <div className="d-flex gap-2 mb-2">
              <input
                type="number"
                value={inputPage}
                onChange={handlePageInputChange}
                min="1"
                max={totalPages}
                className="form-control form-control-sm"
                style={{ width: "80px" }}
              />
              <button type="submit" className="btn btn-light btn-sm ms-1">
                Đi
              </button>
            </div>
          )}
          <button className="btn btn-success btn-sm" onClick={toggleChangePage}>
            Chọn trang
          </button>
        </div>
      </form>
    </div>
  );
}

export default Pagination;
