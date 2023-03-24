import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Employee = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload(false);
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to={"/reservations"} className="nav-button">
          Rezerwacje
        </Link>
        <Link to={"/listGroups"} className="nav-button">
          Grupy
        </Link>
        <Link to={"/reports"} className="nav-button">
          Raporty
        </Link>
        <Link to={"/presenceList"} className="nav-button">
          Lista obecności
        </Link>
        <Link onClick={handleLogout} to={"/login"} className="nav-button">
          Wyloguj {localStorage.getItem("email")}
        </Link>
      </div>
    </div>
  );
};
