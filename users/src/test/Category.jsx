import React from "react";
import { Link } from "react-router-dom";

function Category({ title, data, isOpen, onToggle }) {
  // const [category, setCategory] = useState(false);

  return (
    <>
      <li className="nav-item dropdown">
        <button className="nav-link dropdown-toggle" onClick={onToggle}>
          {title}
        </button>
        {isOpen && (
          <ul className="dropdown-menu dropdown-menu-custom show">
            {data.map((item) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  key={item.id}
                >
                  <Link to="/category" className="dropdown-item ">
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </>
  );
}

export default Category;
