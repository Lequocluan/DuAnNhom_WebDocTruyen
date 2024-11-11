import { Link } from "react-router-dom";
import { Data1, Data2, Data3 } from "./Data";
import { nanoid } from "nanoid";
import SectionStoriesHotItem from "./SectionStoriesHotItem";

function SectionStoriesHot() {
  return (
    <>
      <div className="section-stories-hot mb-3">
        <div className="container">
          <div className="row">
            <div className="head-title-global d-flex justify-content-between mb-2">
              <div className="col-6 col-md-4 col-lg-4 head-title-global__left d-flex align-items-center">
                <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                  <Link
                    className="d-block text-decoration-none text-dark fs-4 story-name"
                    title="Truyện Hot"
                  >
                    Truyện Hot
                  </Link>
                </h2>
                <i className="fa-solid fa-fire-flame-curved"></i>
              </div>

              <div className="col-4 col-md-3 col-lg-2">
                <select
                  className="form-select select-stories-hot"
                  aria-label="Truyen hot"
                  defaultValue={""} // defaultValue for uncontrolled components
                >
                  <option value="">Tất cả</option>
                  {Data1.map((data, index) => {
                    return (
                      <option key={nanoid()} value={index + 1}>
                        {data.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="section-stories-hot__list">
                {Data2.map((data) => {
                  return <SectionStoriesHotItem key={data.id} {...data} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionStoriesHot;
