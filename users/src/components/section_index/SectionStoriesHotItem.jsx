import { Link } from "react-router-dom";
import img11 from "../../assets/images/diu_dang_tan_xuong.jpg";

function SectionStoriesHotItem({ name, story_picture, status, slug }) {
  const imagePath = story_picture?.path || img11;
  return (
    <>
      <div className="story-item">
        <Link className="d-block text-decoration-none" to={`/${slug}`}>
          <div className="story-item__image">
            <img
              src={imagePath}
              alt=""
              className="img-fluid"
              width="150"
              height="230"
              loading="lazy"
            />
          </div>
          <h3 className="story-item__name text-one-row story-name">{name}</h3>

          <div className="list-badge">
            {status === "1" ? (
              <span className="story-item__badge badge text-bg-success">
                Full
              </span>
            ) : status === "2" ? (
              <>
                <span className="story-item__badge story-item__badge-hot badge text-bg-danger">
                  Hot
                </span>

                <span className="story-item__badge story-item__badge-new badge text-bg-info text-light">
                  New
                </span>
              </>
            ) : status === "3" ? (
              <>
                <span className="story-item__badge badge text-bg-success">
                  Full
                </span>
                <span className="story-item__badge story-item__badge-hot badge text-bg-danger">
                  Hot
                </span>

                <span className="story-item__badge story-item__badge-new badge text-bg-info text-light">
                  New
                </span>
              </>
            ) : (
              <span className="badge text-bg-secondary text-light">
                Unknown
              </span>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}

export default SectionStoriesHotItem;
