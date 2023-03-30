import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import { Link } from "react-router-dom";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState();
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="avatar"
          className="img-responsive rounded-circle"
          width="50"
          height="50"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
