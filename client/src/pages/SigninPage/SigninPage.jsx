import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SigninPage.scss";

const SigninPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
    setError(null);
    console.log(input);

    try {
      const response = await axios.post(
        "http://localhost:5555/api/getuser",
        input
      );

      if (response.data) {
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("loggedIn", true);
        alert("Successfully logged in. Redirecting to the homepage.");
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log("The error is: ", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="signin">
      <h1>Signin</h1>
      <div className="signin-card">
        <form onSubmit={handleSubmit}>
          <div className="signin-items">
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
          <div className="signin-items">
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
          <div className="error">{error}</div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
