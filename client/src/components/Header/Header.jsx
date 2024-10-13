import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import Profile from "../Dropdown/Profile";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const name = localStorage.getItem("userName");
  const isloggedin = localStorage.getItem("loggedIn") === "true";
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
    <div className="header">
      <div className={isHomePage ? "homeLinks" : "links"}>
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
