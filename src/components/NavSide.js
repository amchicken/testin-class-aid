import React from "react";
import { Link } from "react-router-dom";
//IMPORT ICON
import { Home as HomeIcon, Inbox } from "@material-ui/icons/";
function NavSide() {
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Inbox />
        </li>
      </ul>
    </nav>
  );
}
export default NavSide;
