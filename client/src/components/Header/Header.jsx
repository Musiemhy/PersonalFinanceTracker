import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import Profile from "../Dropdown/Profile";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const name = sessionStorage.getItem("userName");
  const isHomePage = location.pathname === "/";
  const isloggedin = sessionStorage.getItem("loggedIn") === "true";
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!isloggedin) {
      navigate("/signin");
    }
  }, [isloggedin, navigate]);

  const toggleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={isHomePage ? "home" : "header"}>
      <div className={isHomePage ? "home-links" : "links"}>
        <Link to="/">HOME</Link>
        <Link to="/transaction">TRANSACTION</Link>
        <Link to="/budget">BUDGET</Link>
      </div>
      <div className="profile">
        <button
          className={isHomePage ? "home-profile-name" : "profile-name"}
          onClick={toggleClick}
        >
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
