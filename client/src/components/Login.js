import React, { useState } from "react";
import { axiosWithAuth } from "../utilities/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChanges = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(user);
  };

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <button onClick={logOut}> Logout</button>

      <form onSubmit={onSubmit} className="login-form">
        <label>Username</label>
        <input
          type="text"
          value={user.username}
          placeholer="Username"
          onChange={handleChanges}
          name="username"
        />
        <label> Password</label>
        <input
          type="text"
          value={user.password}
          placeholer="Password"
          onChange={handleChanges}
          name="password"
        />
        <button> Login</button>
      </form>
    </div>
  );
};

export default Login;
