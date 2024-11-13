import {  NavLink } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineUsers
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
          <NavLink to="/about" className="nav-link">
            <HiOutlineUsers /> <span>About</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="nav-link">
            <HiOutlineUsers /> <span>Contact</span>
          </NavLink>
        </li>
            </ul>
        </nav>
    )
}
export default MainNav;