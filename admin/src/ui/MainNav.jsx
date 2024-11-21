import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineFolder,
  HiOutlineDocumentText,
  HiOutlineMegaphone,
} from "react-icons/hi2";
import { FaAddressBook } from "react-icons/fa6";
function MainNav() {
  return (
    <nav className="mt-8">
      <ul>
        <li>
          <NavLink to="/home" className="nav-link">
            <HiOutlineHome /> <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/author" className="nav-link">
            <FaAddressBook /> <span>Author</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/category" className="nav-link">
            <HiOutlineFolder /> <span>Category</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/chapters" className="nav-link">
            <HiOutlineDocumentText /> <span>Chapters</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/ads" className="nav-link">
            <HiOutlineMegaphone /> <span>Advertise</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default MainNav;
