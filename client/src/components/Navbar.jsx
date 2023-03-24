import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { User } from "./User";
import { Client } from "./Client";
import { Employee } from "./Employee";

export const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} className="logo" alt="logo" />
        </Link>
      </div>
      <div className="nav-links">
        <div className="flex-child">
          {(role !== "Employee" && role !== "Client" && role !== "DanceSchoolOwner") && <User />}
          {(role === "Employee" || role==="DanceSchoolOwner") && <Employee />}
          {role === "Client" && <Client />}
        </div>
      </div>
    </div>
  );
};
