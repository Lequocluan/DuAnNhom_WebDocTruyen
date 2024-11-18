import { DataCategory } from "./Data";
import SectionCategoryItem from "./SectionCategoryItem";

function SectionCatogory() {
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
                    Thể Loại Truyện
                  </span>
                </h2>
              </div>
            </div>
            <div className="list-story-in-category section-stories-hot__list">
              {DataCategory.map((category) => {
                return <SectionCategoryItem key={category.id} {...category} />;
              })}
              {/* <SectionCategoryItem DataCategory={DataCategory} /> */}
            </div>
          </div>
          {/* SECTION CATEGORY DESCRIPTION */}
          <div className="col-12 col-md-4 col-lg-3 sticky-md-top">
            <div className="category-description bg-light p-2 rounded mb-3 card-custom">
              <p className="mb-0 text-secondary"></p>
              <p>
                Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong
                tình yêu của nhân vật chính.
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionCatogory;
