import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav d-flex justify-content-center m-3 fs-5">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link">
          Users
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
