import {  NavLink } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineFolder
} from "react-icons/hi2"
function MainNav(){
    return(
        <nav>
            <ul>
            <li>
          <NavLink to="/home" className="nav-link">
            <HiOutlineHome /> <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/category" className="nav-link">
            <HiOutlineFolder /> <span>Category</span>
          </NavLink>
        </li>
            </ul>
        </nav>
    )
}
export default MainNav;