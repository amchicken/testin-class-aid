import React from "react";
//IMPORT ICON
import { Home as HomeIcon, Inbox } from "@material-ui/icons/";
function NavSide() {
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <HomeIcon />
        </li>
        <li>
          <Inbox />
        </li>
      </ul>
    </nav>
  );
}
export default NavSide;
