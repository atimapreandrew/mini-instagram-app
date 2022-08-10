import React from "react";
import Logo from "../assets/logo.png";

function Nav() {
  return (
    <nav>
      <button className="logo">
        <img src={Logo} alt="Logo" />
      </button>
      <input className="search" type="text" placeholder="Search" />
      <span className="nav-links">
        <button>
          <i className="fas fa-home" />
        </button>
        <button>
          <i className="fas fa-comment-alt" />
        </button>
        <button>
          <i className="fas fa-compass" />
        </button>
        <button>
          <i className="fas fa-heart" />
        </button>
      </span>
    </nav>
  );
}

export default Nav;
