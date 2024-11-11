import { Link } from "react-router-dom";

function SectionStoriesHotItem({ img, title }) {
  return (
    <>
      <div className="story-item">
        <Link className="d-block text-decoration-none" to="/details">
          <div className="story-item__image">
            <img
              src={img}
              alt={title}
              className="img-fluid"
              width="150"
              height="230"
              loading="lazy"
            />
          </div>
          <h3 className="story-item__name text-one-row story-name">{title}</h3>

          {/* <div className="list-badge">
            {Data3.map((data) => {
              return (
                <span
                  key={nanoid()}
                  className={`story-item__badge ${data.className}`}
                >
                  {data.text}
                </span>
              );
            })}
          </div> */}

          <div className="list-badge">
            <span className="story-item__badge badge text-bg-success">
              Full
            </span>

            <span className="story-item__badge story-item__badge-hot badge text-bg-danger">
              Hot
            </span>

            <span className="story-item__badge story-item__badge-new badge text-bg-info text-light">
              New
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default SectionStoriesHotItem;
