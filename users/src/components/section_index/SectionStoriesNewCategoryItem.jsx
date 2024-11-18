import { Link } from "react-router-dom";

function SectionStoriesNewCategoryItem({ name }) {
  return (
    <>
      <li className="">
        <Link to="/" className="text-decoration-none text-dark hover-title">
          {name}
        </Link>
      </li>
    </>
  );
}

export default SectionStoriesNewCategoryItem;
