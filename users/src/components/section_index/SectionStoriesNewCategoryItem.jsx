import { Link } from "react-router-dom";

function SectionStoriesNewCategoryItem({ title }) {
  return (
    <>
      <li className="">
        <Link to="/" className="text-decoration-none text-dark hover-title">
          {title}
        </Link>
      </li>
    </>
  );
}

export default SectionStoriesNewCategoryItem;
