import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function SectionComicDetail({ detailComic, image }) {
  const { name, slug, content, author, category, status, chapters } =
    detailComic;

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [changePage, setchangePage] = useState(false);

  const chaptersPerPage = 10;
  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters =
    chapters.length > 0
      ? chapters[0].server_data.slice(indexOfFirstChapter, indexOfLastChapter)
      : [];

  const leftColumn = currentChapters.slice(
    0,
    Math.ceil(currentChapters.length / 2)
  );
  const rightColumn = currentChapters.slice(
    Math.ceil(currentChapters.length / 2)
  );

  const totalPages = Math.ceil(
    chapters[0]?.server_data.length / chaptersPerPage
  );

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
      setCurrentPage(page);
    }
  };

  const toggleChangePage = () => {
    setchangePage(!changePage);
  };

  return (
    <>
      <div className="story-detail">
        <div className="story-detail__top d-flex align-items-start">
          <div className="row align-items-start">
            <div className="col-12 col-md-12 col-lg-3 story-detail__top--image">
              <div className="book-3d">
                <img
                  src={image}
                  alt=""
                  className="img-fluid w-100"
                  width="200px"
                  height="300px"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <h3 className="text-center story-name">{name}</h3>
              <div
                className="story-detail__top--desc px-3"
                style={{ maxHeight: "285px", overflow: "auto" }}
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </div>
        </div>

        <div className="story-detail__bottom mb-3">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-3 story-detail__bottom--info mt-3">
              <p className="mb-1">
                <strong>Tác giả: </strong>
                <a
                  href="#"
                  className="text-decoration-none text-dark hover-title"
                >
                  {author}
                </a>
              </p>
              <div className="d-flex align-items-center mb-1 flex-wrap">
                <strong className="me-1">Thể loại:</strong>
                <div className="d-flex align-items-center flex-wrap">
                  {category.map((item) => (
                    <span key={item.id} className="d-flex align-items-center">
                      <Link
                        to={`/category/${item.slug}`}
                        className="btn btn-primary btn-sm m-1"
                      >
                        {item.name}
                      </Link>
                    </span>
                  ))}
                </div>
              </div>

              <p className="mb-1">
                <strong>Trạng thái: </strong>
                <span className="text-info font-bold">
                  {status === "ongoing" ? "Đang cập nhật" : "Full"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="story-detail__list-chapter">
          <div className="head-title-global d-flex justify-content-between mb-4">
            <div className="col-6 col-md-12 col-lg-4 head-title-global__left d-flex">
              <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                <span
                  href="#"
                  className="d-block text-decoration-none text-dark fs-4 title-head-name"
                  title="Truyện hot"
                >
                  Danh sách chương
                </span>
              </h2>
            </div>
          </div>

          {/* Danh sách chương */}
          <div className="story-detail__list-chapter--list">
            <div className="row">
              <div className="col-12 d-flex justify-content-center col-sm-6 col-lg-6 story-detail__list-chapter--list__item">
                <ul>
                  {leftColumn.map((chapter) => (
                    <li key={chapter.chapter_name}>
                      <Link
                        to={`/${slug}/${chapter.slug}`}
                        className="text-decoration-none text-dark hover-title"
                      >
                        {`Chương ${chapter.chapter_name}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-12 d-flex justify-content-center col-sm-6 col-lg-6 story-detail__list-chapter--list__item">
                <ul>
                  {rightColumn.map((chapter) => (
                    <li key={chapter.chapter_name}>
                      <Link
                        to={`/${slug}/${chapter.slug}`}
                        className="text-decoration-none text-dark hover-title"
                      >
                        {`Chương ${chapter.chapter_name}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phân trang */}
              <div className="pagination mt-3 d-flex justify-content-center align-items-center">
                {/* Nút chuyển đến trang đầu */}
                <button
                  className={`btn ${
                    currentPage === 1 ? "btn-light" : "btn-primary"
                  } mx-1`}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  &laquo;&laquo; Đầu
                </button>

                {/* Các nút trang gần trang hiện tại */}
                {currentPage > 2 && (
                  <button
                    className="btn btn-light mx-1"
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </button>
                )}

                {currentPage > 1 && (
                  <button
                    className="btn btn-light mx-1"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </button>
                )}

                <button className="btn btn-primary mx-1">{currentPage}</button>

                {currentPage < totalPages && (
                  <button
                    className="btn btn-light mx-1"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </button>
                )}

                {currentPage < totalPages - 1 && (
                  <button
                    className="btn btn-light mx-1"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}

                {/* Nút chuyển đến trang cuối */}
                <button
                  className={`btn ${
                    currentPage === totalPages ? "btn-light" : "btn-primary"
                  } mx-1`}
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Cuối &raquo;&raquo;
                </button>

                {/* Input chọn trang */}
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  className="gap-2"
                >
                  {changePage && (
                    <form onSubmit={handlePageSubmit} className="ms-3 d-flex">
                      <input
                        type="number"
                        value={inputPage}
                        onChange={handlePageInputChange}
                        min="1"
                        max={totalPages}
                        className="form-control form-control-sm"
                        style={{ width: "80px" }}
                      />
                      <button
                        type="submit"
                        className="btn btn-light btn-sm ms-1"
                      >
                        Đi
                      </button>
                    </form>
                  )}
                  <button
                    onClick={toggleChangePage}
                    className="btn btn-success"
                  >
                    Chọn trang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionComicDetail;
