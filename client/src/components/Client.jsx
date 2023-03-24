import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Client = () => {
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
        <Link to={"/newReservation"} className="nav-button">
          Zarezerwuj zajęcia
        </Link>
        <Link to={"/myReservations"} className="nav-button">
          Moje rezerwacje
        </Link>
        <Link to={"/listGroups"} className="nav-button">
          Grupy
        </Link>
        <Link className="nav-button" onClick={handleLogout} to={"/login"}>
          Wyloguj {localStorage.getItem("email")}
        </Link>
      </div>
    </div>
  );
};
