import { Link } from "react-router-dom";
import StarRating from "../../ui/start_rating/StarRating";
import { useState } from "react";
import CommentStory from "./CommentStory";

function SectionStoryDetails({ detailStory }) {
  const {
    name,
    slug,
    description,
    story_picture,
    author,
    views,
    shares,
    categories,
    status,
    chapters,
  } = detailStory;
  const [userRating, setUserRating] = useState("");
  return (
    <>
      <div className="story-detail">
        <div className="story-detail__top d-flex align-items-start">
          <div className="row align-items-start">
            <div className="col-12 col-md-12 col-lg-3 story-detail__top--image">
              <div className="book-3d">
                <img
                  src={story_picture.path}
                  alt={story_picture.title}
                  className="img-fluid w-100"
                  width="200px"
                  height="300px"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <h3 className="text-center story-name">{name}</h3>

              <StarRating
                maxRating={10}
                size={24}
                messages={[
                  "Rất tệ",
                  "Tệ",
                  "Bình thường",
                  "Khá",
                  "Tốt",
                  "Rất tốt",
                  "Tuyệt vời",
                  "Xuất sắc",
                  "Hoàn hảo",
                  "Đỉnh cao",
                ]}
                onSetRating={setUserRating}
              />

              <div
                class="rate-story__value text-center mt-2"
                itemprop="aggregateRating"
                itemscope=""
                itemtype="https://schema.org/AggregateRating"
              >
                <em>
                  Đánh giá:{" "}
                  <strong>
                    <span itemprop="ratingValue">{views}</span>
                  </strong>
                  /
                  <span class="" itemprop="bestRating">
                    10{" "}
                  </span>
                  từ{" "}
                  <strong>
                    <span itemprop="ratingCount">{shares}</span> lượt
                  </strong>
                </em>
              </div>

              {/* <div className="rate-story mb-2">
                <div
                  className="rate-story__holder"
                  data-score={storyDetails.rating.score}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={i < storyDetails.rating.score / 2 ? star : staroff}
                      alt="star"
                    />
                  ))}
                </div>
                <em className="rate-story__text"></em>
                <div
                  className="rate-story__value"
                  itemProp="aggregateRating"
                  itemScope=""
                  itemType="https://schema.org/AggregateRating"
                >
                  <div className="rate-story__value">
                    Đánh giá:
                    <strong>{storyDetails.rating.score}</strong>/
                    {storyDetails.rating.outOf} từ{" "}
                    <strong>{storyDetails.rating.count}</strong> lượt
                  </div>
                </div>
              </div> */}

              <div
                className="story-detail__top--desc px-3"
                style={{ maxHeight: "285px", overflow: "auto" }}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              {/* <div className="info-more">
                <div className="info-more--more active" id="info_more">
                  <span className="me-1 text-dark">Xem thêm</span>
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.70749 7.70718L13.7059 1.71002C14.336 1.08008 13.8899 0.00283241 12.9989 0.00283241L1.002 0.00283241C0.111048 0.00283241 -0.335095 1.08008 0.294974 1.71002L6.29343 7.70718C6.68394 8.09761 7.31699 8.09761 7.70749 7.70718Z"
                      style={{ fill: "#2C2C37" }}
                    ></path>
                  </svg>
                </div>

                <a
                  className="info-more--collapse text-decoration-none"
                  href="#"
                >
                  <span className="me-1 text-dark">Thu gọn</span>
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.70749 0.292817L13.7059 6.28998C14.336 6.91992 13.8899 7.99717 12.9989 7.99717L1.002 7.99717C0.111048 7.99717 -0.335095 6.91992 0.294974 6.28998L6.29343 0.292817C6.68394 -0.097606 7.31699 -0.0976055 7.70749 0.292817Z"
                      style={{ fill: "#2C2C37" }}
                    ></path>
                  </svg>
                </a>
              </div> */}
            </div>
          </div>
        </div>

        <div className="story-detail__bottom mb-3">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-3 story-detail__bottom--info mt-3">
              <p className="mb-1">
                <strong>Tác giả:</strong>
                <a
                  href="#"
                  className="text-decoration-none text-dark hover-title"
                >
                  {author.full_name}
                </a>
              </p>
              <div className="d-flex align-items-center mb-1 flex-wrap">
                <strong className="me-1">Thể loại:</strong>
                <div className="d-flex align-items-center flex-warp">
                  {categories.map((categoty) => {
                    return (
                      <Link
                        key={categoty.id}
                        href="#"
                        className="text-decoration-none text-dark hover-title me-1"
                      >
                        {categoty.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <p className="mb-1">
                <strong>Trạng thái: </strong>
                <span className="text-info">
                  {status === "2" ? "Full" : "Đang cập nhật"}
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
          <div className="story-detail__list-chapter--list">
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
          </div>
        </div>

        {/* <div className="pagination" style={{ justifyContent: "center" }}>
          <ul>
            <li className="pagination__item page-current">
              <a
                className="page-link story-ajax-paginate"
                data-url="https://suustore.com/truyen/nang-khong-muon-lam-hoang-hau?page=1"
                style={{ cursor: "pointer" }}
              >
                1
              </a>
            </li>
            <li className="pagination__item">
              <a
                className="page-link story-ajax-paginate"
                data-url="https://suustore.com/truyen/nang-khong-muon-lam-hoang-hau?page=2"
                style={{ cursor: "pointer" }}
              >
                2
              </a>
            </li>

            <div className="dropup-center dropup choose-paginate me-1">
              <button
                className="btn btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Chọn trang
              </button>
              <div className="dropdown-menu">
                <input
                  type="number"
                  className="form-control input-paginate me-1"
                />
                <button className="btn btn-success btn-go-paginate">Đi</button>
              </div>
            </div>

            <li className="pagination__arrow pagination__item">
              <Link
                data-url="https://suustore.com/truyen/nang-khong-muon-lam-hoang-hau?page=2"
                style={{ cursor: "pointer" }}
                className="text-decoration-none w-100 h-100 d-flex justify-content-center align-items-center story-ajax-paginate"
              >
                &gt;&gt;
              </Link>
            </li>
          </ul>
        </div> */}

        <CommentStory detailStory={detailStory} />
      </div>
    </>
  );
}

export default SectionStoryDetails;
