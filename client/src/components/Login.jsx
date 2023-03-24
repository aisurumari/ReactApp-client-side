import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || "visitor");

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("//localhost:3001/login", {
      email: email,
      password: password,
    }).then(async (response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus("hej");
        await Axios.get(`//localhost:3001/role/${email}`).then((response) => {
          setRole(response.data);
          console.log(role);
          localStorage.setItem("role", response.data);
          localStorage.setItem("email", email);
        });

        navigate("/");
        window.location.reload(false);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="auth-form">
      <h2>Logowanie</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="twojemail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">hasło</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="acceptance-button" type="submit">
          Zaloguj się
        </button>
      </form>
      <Link to={"/register"}>Nie masz konta? Zarejestruj się</Link>
      <h3>{loginStatus}</h3>
    </div>
  );
};
