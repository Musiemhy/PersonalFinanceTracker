import React from "react";
import "./CardItems.scss";

const CardItems = ({ title, cardNumber, icon, text, description }) => {
  return (
    <div className="card" id={`card${cardNumber}`}>
      <h1 className="title">{title}</h1>
      <div className="circle">
        <p className="circle-text">{cardNumber}</p>
      </div>
      <div className="icon">
        <video
          src={icon}
          autoPlay
          loop
          muted
          playsInline
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="text">{text}</p>
      <p className="description">{description}</p>
    </div>
  );
};

export default CardItems;
