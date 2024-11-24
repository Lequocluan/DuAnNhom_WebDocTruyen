import { Link } from "react-router-dom";
import img2 from "../../assets/images/ngao_the_dan_than.jpg";

function SectionStoriesDoneItem({ categories, story_picture }) {
  const imagePath = story_picture?.path || img2;

  return (
    <>
      {categories.map((category) => {
        return (
          <div className="story-item-full text-center" key={category.id}>
            <Link
              // to={`/${category.slug}/${chapter.slug}`}
              to={`/category/${category.slug}`}
              className="d-block story-item-full__image"
            >
              <img
                src={imagePath}
                alt=""
                className="img-fluid w-100"
                width="150"
                height="230"
                loading="lazy"
              />
            </Link>
            <h3 className="fs-6 story-item-full__name fw-bold text-center mb-0">
              <Link
                to={`/category/${category.slug}`}
                className="text-decoration-none text-one-row story-name"
              >
                {category.name}
              </Link>
            </h3>
            <span className="story-item-full__badge badge text-bg-success">
              {"Full"}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default SectionStoriesDoneItem;
