import star from "../../assets/images/star-on.png";
import starhalf from "../../assets/images/than_dao_dan_ton.jpg";
import staroff from "../../assets/images/star-off.png";
import { Link } from "react-router-dom";

function SectionStoryDetails({ detailStory }) {
  const { name, description, story_picture, author_id, categories, status } =
    detailStory;
  console.log(detailStory);
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
                style={{ maxHeight: "285px" }}
              >
                {description}
              </div>

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
                  {author_id}
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
                  {status === "1" ? "Full" : "Đang cập nhật"}
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
                <ul>
                  <li>
                    <Link
                      to="/"
                      className="text-decoration-none text-dark hover-title"
                    >
                      Chương 1: Nàng không tin Yến Đình lại lừa nàng chuyện lớn
                      đến vậy!
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-decoration-none text-dark hover-title"
                    >
                      Chương 1: Nàng không tin Yến Đình lại lừa nàng chuyện lớn
                      đến vậy!
                    </Link>
                  </li>
                </ul>
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
      </div>
    </>
  );
}

export default SectionStoryDetails;
