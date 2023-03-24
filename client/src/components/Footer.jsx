import React from "react";
import logo from "../logo.png";

export const Footer = () => {
  return (
    <footer>
      <div>
        <img src={logo} className="logo-footer" alt="logo" />
      </div>
      <div>
        <p>© 2023. All rights reserved.</p>
      </div>
      <div>
        <p>Maria Wichrowska 230035</p>
      </div>
    </footer>
  );
};
