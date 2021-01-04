import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../actions/loginAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const [showMenu, setShowMenu] = useState(false);

  function logout() {
    dispatch(Logout());
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
    console.log(showMenu);
  }

  return (
    <div className="nav-profile-container" onClick={toggleMenu}>
      <div className="nav-profile">
        <p>{user.name}</p>
        <div className="profileImage">{user.name.charAt(0)}</div>
      </div>
      <div className={showMenu ? "nav-menu show" : "nav-menu"}>
        <div>
          <Link to="/"></Link>
        </div>
        <div onClick={logout}>Logout</div>
      </div>
    </div>
  );
};

export default Profile;
