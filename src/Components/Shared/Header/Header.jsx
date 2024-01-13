import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import "./Header.css";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import useCart from "../../../Hooks/useCart";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [cart, refetch] = useCart();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // You can perform additional actions when the cart changes here
  }, [cart]);

  return (
    <header className="bg-black/75">
      <div className="flex justify-between items-center">
        <Link to="/" className="app-name">
           Sip Coffee
        </Link>

        <div className="nav-links">
          <NavLink to="/" className="links text-white text-xl font-bold">
            Home
          </NavLink>
          <NavLink to="/menu" className="link text-xl text-white font-bold">
            Menu
          </NavLink>
          <NavLink to="/dashboard" className="text-xl text-white font-bold">
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/mycart"
            className="shopping-cart-icon link"
            onClick={closeMenu}
          >
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </NavLink>
          {user ? (
            <>
              <li className="flex justify-center items-center text-[15px] xl:text-xl text-white font-bold">
                {user?.displayName}
              </li>
              <li className="flex justify-center ps-[40px]">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-primary text-xl font-bold"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-xl text-white font-bold"
              >
                Login
              </NavLink>
            </>
          )}
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
