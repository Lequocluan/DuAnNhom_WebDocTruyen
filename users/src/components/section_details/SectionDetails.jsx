import { storyDetails, topRatingData } from "./Data";

import SectionStoryDetails from "./SectionStoryDetails";
import SectionTopRating from "./SectionTopRating";

function SectionDetails() {
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md-7 col-lg-8">
            <div className="head-title-global d-flex justify-content-between mb-4">
              <div className="col-12 col-md-12 col-lg-4 head-title-global__left d-flex">
                <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                  <span
                    className="d-block text-decoration-none text-dark fs-4 title-head-name"
                    title="Thông tin truyện"
                  >
                    Thông tin truyện
                  </span>
                </h2>
              </div>
            </div>
            <SectionStoryDetails storyDetails={storyDetails} />
          </div>

          <div className="col-12 col-md-5 col-lg-4 sticky-md-top">
            <SectionTopRating topRatingData={topRatingData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionDetails;
