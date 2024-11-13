import { DataCategory } from "./Data";
import SectionCategoryItem from "./SectionCategoryItem";

function SectionCatogory() {
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          {/* SECTION CATEGORY LIST */}
          <div class="col-12 col-md-8 col-lg-9 mb-3">
            <div class="head-title-global d-flex justify-content-between mb-2">
              <div class="col-12 col-md-12 col-lg-12 head-title-global__left d-flex">
                <h2 class="me-2 mb-0 border-bottom border-secondary pb-1">
                  <span
                    href="#"
                    class="d-block text-decoration-none text-dark fs-4 category-name"
                    title="Ngôn Tình"
                  >
                    Thể Loại Truyện
                  </span>
                </h2>
              </div>
            </div>
            <div class="list-story-in-category section-stories-hot__list">
              {DataCategory.map((category) => {
                return <SectionCategoryItem key={category.id} {...category} />;
              })}
              {/* <SectionCategoryItem DataCategory={DataCategory} /> */}
            </div>
          </div>
          {/* SECTION CATEGORY DESCRIPTION */}
        </div>
      </div>
    </>
  );
}

export default SectionCatogory;
