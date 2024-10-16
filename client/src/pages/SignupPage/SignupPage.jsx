import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./SignupPage.scss";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    type: "student",
    password: "",
    confirm_password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInput((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(input);

    try {
      const response = await axios.post(
        "http://localhost:5555/api/adduser",
        input
      );
      if (response.data.message === "registered") {
        alert("Successfully registered. Being redirected to login page.");
        navigate("/signin");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log("The error is: ", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="signup">
      <Link to="/landing" className="nav">
        Home
      </Link>
      <h1>Signup</h1>
      <div className="signup-card">
        <form onSubmit={handleSubmit}>
          <div className="signup-items">
            <label htmlFor="name"> FULL NAME: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name + Last Name"
              value={input.name}
              onChange={handleChange}
            />
          </div>
          <div className="signup-items">
            <label htmlFor="email"> EMAIL: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="...@gmail.com"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <div className="signup-items">
            <div className="label">
              <label htmlFor="password"> PASSWORD: </label>
              <button type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder=""
              value={input.password}
              onChange={handleChange}
            />
          </div>
          <div className="signup-items">
            <div className="label">
              <label htmlFor="confirmPassword"> CONFIRM PASSWORD: </label>
              <button type="button" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirm_password"
              placeholder="Must be identical with password!"
              value={input.confirm_password}
              onChange={handleChange}
            />
          </div>
          <div className="error">{error}</div>
          <button type="submit">Sign Up</button>
        </form>
        <div className="redirect">
          <Link to="/signin">Already have an account? Go To Signin</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
