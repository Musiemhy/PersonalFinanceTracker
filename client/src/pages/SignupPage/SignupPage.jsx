import React, { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, email, password);
  };

  return (
    <div className="signup">
      <div className="signup-card">
        <form onSubmit={handleSubmit}>
          <div className="signup-items">
            <label htmlFor="name"> FULL NAME: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name + Last Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="signup-items">
            <label htmlFor="email"> EMAIL: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="...@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="signup-items">
            <label htmlFor="password"> PASSWORD: </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="signup-items">
            <label htmlFor="confirmPassword"> CONFIRM PASSWORD: </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Must be identical with password!"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
