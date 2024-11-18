import React from "react";
import { Link } from "react-router-dom";

function Category({ title, dataCetegory, isOpen, onToggle }) {
  // const [category, setCategory] = useState(false);

  return (
    <>
      <li className="nav-item dropdown">
        <button className="nav-link dropdown-toggle" onClick={onToggle}>
          {title}
        </button>
        {isOpen && (
          <ul className="dropdown-menu dropdown-menu-custom show">
            {dataCetegory.map((item) => {
              return (
                <li
                  style={{ cursor: "pointer" }}
                  className="cursor-pointer"
                  key={item.id}
                >
                  <Link to={`/category/${item.slug}`} className="dropdown-item">
                    {item.name}
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
