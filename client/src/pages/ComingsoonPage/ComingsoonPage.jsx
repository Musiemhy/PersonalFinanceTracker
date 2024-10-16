import React from "react";
import { Link } from "react-router-dom";
import "./ComingsoonPage.css";

const ComingsoonPage = () => {
  return (
    <div className="comingSoonContainer">
      <Link to="/landing" className="nav">
        Home
      </Link>
      <div className="comingSoon">
        <div class="outer">
          <div class="dot"></div>
          <div class="comingSoonCard">
            <div class="ray"></div>
            <div class="comingSoonText">COMING SOON</div>
            <div class="line topl"></div>
            <div class="line leftl"></div>
            <div class="line bottoml"></div>
            <div class="line rightl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingsoonPage;
