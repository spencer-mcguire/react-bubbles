import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Loader from "react-loader-spinner";

const initialState = {
  username: "",
  password: ""
};
const Login = props => {
  const [creds, setCreds] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Form Changes
  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  // Form Submit
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    axiosWithAuth()
      .post("/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={creds.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={creds.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
      {loading && (
        <Loader type="BallTriangle" color="red" height={80} width={80} />
      )}
    </>
  );
};

export default Login;
