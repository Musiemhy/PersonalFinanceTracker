import React from "react";
import "./RadioButton.scss";

const RadioButton = ({
  name,
  className,
  id,
  value,
  checked,
  onChange,
  text,
}) => {
  return (
    <div className="radioBtns">
      <input
        type="radio"
        name={name}
        className={className}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="radioBtn">
        {text}
      </label>
    </div>
  );
};

export default RadioButton;
