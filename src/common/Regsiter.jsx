import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import Input from "./Input";

const Login = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const schema = Joi.object({
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToValidate = { username, password, name };
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setError(newErrors);
      return;
    }
    const listOfUsers = JSON.parse(localStorage.getItem("usersDb")) || [];
    const newUser = {
      id: Date.now().toString(),
      email: username,
      password,
      name,
    };
    const existingUser = listOfUsers.find((user) => user.email === username);
    if (existingUser) {
      console.log("user already registered");
      return;
    } else {
      listOfUsers.push(newUser);
      localStorage.setItem("usersDb", JSON.stringify(listOfUsers));
      window.location = "/";
    }
    localStorage.removeItem("usersList");
  };
  if (user) navigate("/");
  return (
    <div className="container">
      <h1>Register</h1>
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
        <Input
          state={name}
          setState={setName}
          error={error.name}
          label="Name"
          InputId="name"
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
