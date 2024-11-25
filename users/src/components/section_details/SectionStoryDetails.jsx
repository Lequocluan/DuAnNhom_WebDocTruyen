import { Link } from "react-router-dom";
import StarRating from "../../ui/start_rating/StarRating";
import { useState } from "react";
import CommentStory from "./CommentStory";
import img11 from "../../assets/images/diu_dang_tan_xuong.jpg";

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
  const imagePath = story_picture?.path || img11;

  const [userRating, setUserRating] = useState("");
  return (
    <>
      <div className="story-detail">
        <div className="story-detail__top d-flex align-items-start">
          <div className="row align-items-start">
            <div className="col-12 col-md-12 col-lg-3 story-detail__top--image">
              <div className="book-3d">
                <img
                  src={imagePath}
                  alt=""
                  className="img-fluid w-100"
                  width="200px"
                  height="300px"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <h3 className="text-center story-name text-4xl font-bold">
                {name}
              </h3>
              {/* <StarRating
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
              </div> */}

              <div
                className="story-detail__top--desc px-3 mt-3"
                style={{ maxHeight: "285px", overflow: "auto" }}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </div>

        <div className="story-detail__bottom mb-3">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-3 story-detail__bottom--info mt-3">
              <p className="mb-1">
                <strong>Tác giả:</strong>
                {author && (
                  <Link
                    to={`/categoryAuthor/${author.id}`}
                    className="text-decoration-none text-dark hover-title"
                  >
                    {author.full_name}
                  </Link>
                )}
              </p>
              <div className="d-flex align-items-center mb-1 flex-wrap">
                <strong className="me-1">Thể loại:</strong>
                <div className="d-flex align-items-center flex-warp">
                  {categories.map((categoty) => {
                    return (
                      <Link
                        key={categoty.id}
                        to={`/category/${categoty.slug}`}
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

        <CommentStory detailStory={detailStory} />
      </div>
    </>
  );
}

export default SectionStoryDetails;
