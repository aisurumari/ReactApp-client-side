import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo_duze.png";

export default function MainPage() {
  const role = localStorage.getItem("role") || null;

  return (
    <div>
      <div className="main-logo">
        <Link to={"/"}>
          <img src={logo} className="logo" alt="logo" />
        </Link>
      </div>
      <div>
        <h3 className={role === "Client" ? "hide" : ""}>
          Witaj na Leadance, gdzie bezstresowo zarządzasz swoją szkołą tańca.
        </h3>
        <h3 className={role === "Client" ? "" : "hide"}>
          Witaj na Leadance, gdzie w prosty sposób zarezerwujesz miejsce na
          zajęcia i sprawdzisz dostępne zajęcia grupowe.
        </h3>
      </div>
    </div>
  );
}
