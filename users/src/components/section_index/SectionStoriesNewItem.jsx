import { Link } from "react-router-dom";

import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

function formatDate(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: vi });
}

function SectionStoriesNewItem({
  name,
  status,
  categories,
  chapter,
  slug,
  story_picture,
  created_at,
}) {
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
              to={`/${slug}`}
              className="text-decoration-none text-dark fs-6 hover-title text-one-row story-name"
            >
              {name}
            </Link>
          </h3>

          {status === "1" ? (
            <span className="badge text-bg-info text-light me-1">New</span>
          ) : status === "2" ? (
            <>
              <span className="badge text-bg-info text-light me-1">New</span>
              <span className="badge text-bg-danger text-light">Hot</span>
            </>
          ) : status === "3" ? (
            <>
              <span className="badge text-bg-info text-light me-1">New</span>
              <span className="badge text-bg-success text-light me-1">
                Full
              </span>
              <span className="badge text-bg-danger text-light">Hot</span>
            </>
          ) : (
            <span className="badge text-bg-secondary text-light">Unknown</span>
          )}
        </div>

        <div className="story-item-no-image__categories ms-3 d-none d-lg-block">
          <p className="mb-0">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="hover-title text-decoration-none text-dark category-name"
              >
                {category.name}
              </Link>
            ))}
          </p>
        </div>

        <div className="story-item-no-image__categories ms-3 d-none d-lg-block">
          <Link
            to={`/${slug}/${chapter.slug}`}
            className="hover-title text-decoration-none text-info"
          >
            {chapter.title}
          </Link>
        </div>

        <div
          className="story-item-no-image__categories ms-2"
          style={{ borderRight: "none" }}
        >
          <p className="mb-0 ms-2">
            <Link className="hover-title text-decoration-none text-dark category-name">
              {formatDate(created_at)}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SectionStoriesNewItem;
