import { Link } from "react-router-dom";

function SectionStoriesNewItem({ title, desc, chapper }) {
  return (
    <>
      <div className="story-item-no-image">
        <div className="story-item-no-image__name d-flex align-items-center">
          <h3 className="me-1 mb-0 d-flex align-items-center">
            <svg
              style={{ width: "10px", marginRight: "5px" }}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
            </svg>
            <Link
              to="#"
              className="text-decoration-none text-dark fs-6 hover-title text-one-row story-name"
            >
              {title}
            </Link>
          </h3>
          <span className="badge text-bg-info text-light me-1">New</span>
          <span className="badge text-bg-success text-light me-1">Full</span>
          <span className="badge text-bg-danger text-light">Hot</span>
        </div>

        <div className="story-item-no-image__categories ms-2 d-none d-lg-block">
          <p className="mb-0">
            {desc.map((category, idx) => (
              <Link
                key={idx}
                to="#"
                className="hover-title text-decoration-none text-dark category-name"
              >
                {category}
                {idx < desc.length - 1 ? ", " : ""}
              </Link>
            ))}
          </p>
        </div>

        <div className="story-item-no-image__chapters ms-2">
          <Link
            to="/chapper"
            className="hover-title text-decoration-none text-info"
          >
            {chapper}
          </Link>
        </div>
      </div>
    </>
  );
}

export default SectionStoriesNewItem;
