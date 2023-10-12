import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import Input from "./Input";

const Login = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToValidate = { username, password };
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setError(newErrors);

      return;
    }
    // Getting the list of registered users from the localStorage
    const listOfUers = JSON.parse(localStorage.getItem("usersDb"));

    // Checking if the email exist in the list of registered user
    const existingUser = listOfUers.find((user) => user.email === username);

    // Validating the user base on the input provided
    if (existingUser && existingUser.email === username) {
      if (existingUser.password === password) {
        console.log(`Welcome ${existingUser.name}`);
        localStorage.setItem("token", JSON.stringify(existingUser.id));
        window.location = "/";
      } else {
        console.log("Incorrect password");
      }
    } else {
      console.log("Not registered");
    }
  };
  if (user) return navigate("/");
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          state={username}
          setState={setUsername}
          error={error.username}
          label="Username"
          InputId="username"
        />
        <Input
          state={password}
          setState={setPassword}
          error={error.password}
          label="Password"
          InputId="password"
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
