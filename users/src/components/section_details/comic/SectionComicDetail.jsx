import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../../ui/Pagination";

function SectionComicDetail({ detailComic, image }) {
  const { name, slug, content, author, category, status, chapters } =
    detailComic;
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
  
    const initialPage = parseInt(queryParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
  const chaptersPerPage = 50;
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
              <h3 className="text-center story-name font-bold">{name}</h3>
              <div
                className="story-detail__top--desc px-3 mt-3"
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
                <Link
                  href="#"
                  className="text-decoration-none text-dark hover-title"
                >
                  {author.filter((item) => item.trim() !== "").length > 0
                    ? author.join(", ")
                    : "Không có tác giả"}
                </Link>
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
          <div className="flex justify-center mb-4 text-center">
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
                        to={`/truyen-tranh/${slug}/chuong-${chapter.chapter_name}`}
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
                        to={`/truyen-tranh/${slug}/chuong-${chapter.chapter_name}`}
                        className="text-decoration-none text-dark hover-title"
                      >
                        {`Chương ${chapter.chapter_name}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {chapters[0]?.server_data.length > chaptersPerPage && (
                <Pagination
                  totalItems={chapters[0]?.server_data.length}
                  itemsPerPage={chaptersPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionComicDetail;
