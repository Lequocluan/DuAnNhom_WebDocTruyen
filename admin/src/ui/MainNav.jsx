import {  NavLink } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineFolder,
    HiOutlineDocumentText
} from "react-icons/hi2"
import {FaAddressBook} from "react-icons/fa6"
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
            </ul>
        </nav>
    )
}
export default MainNav;
