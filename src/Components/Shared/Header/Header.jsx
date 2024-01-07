import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaShoppingBasket } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <div className="flex justify-between items-center">
        <Link to="/" className="app-name">
          <FaShoppingBasket className="basket" /> SmartBasket
        </Link>

        <div className="nav-links">
          <NavLink to="/" className="links text-white text-xl font-bold">
            Home
          </NavLink>
          <NavLink to="/menu" className="link text-xl text-white font-bold">
            Menu
          </NavLink>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>

      {showMenu && (
        <div className="responsive-menu">
          <NavLink
            to="/"
            className="home-link font-semibold"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className="home-link font-semibold"
            onClick={closeMenu}
          >
            Menu
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
