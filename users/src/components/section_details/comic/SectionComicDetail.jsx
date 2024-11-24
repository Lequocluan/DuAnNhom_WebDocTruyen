import { Link } from "react-router-dom";
import { useState } from "react";
import CommentStory from "../CommentStory";

function SectionComicDetail({ detailComic, image }) {
  const { name, slug, content, thumb_url, author, category, status, chapters } =
    detailComic;

  // const [userRating, setUserRating] = useState("");
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
                  {category.map((item) => {
                    return (
                      <span key={item.id} className="d-flex align-items-center">
                        <Link
                          to={`/category/${item.slug}`}
                          className="btn btn-primary btn-sm m-1"
                        >
                          {item.name}
                        </Link>
                      </span>
                    );
                  })}
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

          {/* CHƯƠNG TRUYỆN */}
          {/* <div className="story-detail__list-chapter--list">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6 story-detail__list-chapter--list__item">
                {chapters.length > 0 ? (
                  <ul>
                    {chapters.map((chapter) => (
                      <li key={chapter.id}>
                        <Link
                          to={`/${slug}/${chapter.slug}`}
                          className="text-decoration-none text-dark hover-title"
                        >
                          {chapter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Danh sách chương sẽ sớm được cập nhật.</p>
                )}
              </div>
            </div>
          </div> */}
        </div>

        {/* <CommentStory detailStory={detailStory} /> */}
      </div>
    </>
  );
}

export default SectionComicDetail;
