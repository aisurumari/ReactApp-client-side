import React from "react";
import { Link } from "react-router-dom";

export const User = () => {
  return (
    <div className="links">
      <Link to={"/login"} className="nav-button">
        Logowanie
      </Link>
      <Link to={"/register"} className="nav-button">
        Rejestracja
      </Link>
    </div>
  );
};
