import { Link } from "react-router-dom";

function SectionTitle({ title, link }) {
  return (
    <>
      <Link
        to={link}
        className="d-block text-decoration-none text-dark fs-4 story-name"
        title={title}
      >
        {title}
      </Link>
    </>
  );
}

export default SectionTitle;
