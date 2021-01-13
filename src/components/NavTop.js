import React from "react";
import { Link } from "react-router-dom";
//PAGE AND COMPONENT
import Profile from "./Profile";

function NavTop() {
  return (
    <nav className="top-nav">
      <Link to="/">
        <div id="logo">CLASS-AID</div>
      </Link>
      <Profile />
    </nav>
  );
}

export default NavTop;
