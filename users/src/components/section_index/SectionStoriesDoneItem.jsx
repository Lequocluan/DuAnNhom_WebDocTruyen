import { Link } from "react-router-dom";
import img2 from "../../assets/images/ngao_the_dan_than.jpg";

function SectionStoriesDoneItem({
  categories,
  story_picture,
  name,
  slug,
  is_vip,
}) {
  const imagePath = story_picture?.path || img2;

  return (
    <>
      <div className="story-item-full text-center">
        <Link
          // to={`/${category.slug}/${chapter.slug}`}
          to={`/truyen-chu/${slug}`}
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
            to={`/category/${slug}`}
            className="text-decoration-none text-one-row story-name"
          >
            {name}
          </Link>
        </h3>
        <span className="story-item-full__badge badge text-bg-success">
          {"Full"}
        </span>
      </div>
    </>
  );
}

export default SectionStoriesDoneItem;
