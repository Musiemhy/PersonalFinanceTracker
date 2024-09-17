import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Profile from "../Dropdown/Profile";

const Header = () => {
  const name = localStorage.getItem("userName");
  const [isClicked, setIsClicked] = useState(false);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="header">
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/transaction">TRANSACTION</Link>
        <Link to="/budget">BUDGET</Link>
      </div>
      <div className="profile">
        <button className="profile-name" onClick={toggleClick}>
          {name}
        </button>
        <div
          className="profile-detail"
          style={{ display: isClicked ? "inline" : "none" }}
        >
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
