function SectionCategoryItem({ img, title }) {
  return (
    <>
      <div className="story-item">
        <a href="#" className="d-block text-decoration-none">
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
        </a>
      </div>
    </>
  );
}

export default SectionCategoryItem;
