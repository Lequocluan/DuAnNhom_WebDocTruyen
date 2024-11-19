import { Link } from "react-router-dom";

function SectionStoriesNewCategoryItem({ name, slug }) {
  return (
    <>
      <li className="">
        <Link
          to={`/category/${slug}`}
          className="text-decoration-none text-dark hover-title"
        >
          {name}
        </Link>
      </li>
    </>
  );
}

export default SectionStoriesNewCategoryItem;
