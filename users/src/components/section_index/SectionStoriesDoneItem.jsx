import { Link } from "react-router-dom";

function SectionStoriesDoneItem({ img, title, chappers }) {
  return (
    <>
      <div className="story-item-full text-center">
        <Link to="#" className="d-block story-item-full__image">
          <img
            src={img}
            alt={title}
            className="img-fluid w-100"
            width="150"
            height="230"
            loading="lazy"
          />
        </Link>
        <h3 className="fs-6 story-item-full__name fw-bold text-center mb-0">
          <Link to="#" className="text-decoration-none text-one-row story-name">
            {title}
          </Link>
        </h3>
        <span className="story-item-full__badge badge text-bg-success">
          {chappers}
        </span>
      </div>
    </>
  );
}

export default SectionStoriesDoneItem;
