import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const closeNavbar = () => {
    setIsOpen(false);
  };
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <nav className="bg-black/75 py-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="mr-10 text-xl lg:text-3xl text-white font-mono font-bold flex-shrink-0">
            Sip Coffee
          </h1>
          <div className="flex items-center">
            <div className="hidden lg:block ml-auto">
              <div className="flex justify-center space-x-4">
                <NavLink to="/" className="links text-white text-xl font-bold">
                  Home
                </NavLink>
                
                <NavLink
                  to="/menu"
                  className="link text-xl text-white font-bold px-5"
                >
                  Menu
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="text-xl text-white font-bold"
                >
                  Dashboard
                </NavLink>
                <NavLink to="/dashboard/mycart" className="text-lg px-5">
                  <button className="btn relative">
                    <FaShoppingCart className="text-xl text-white" />
                    <div className=" absolute top-[-18px] left-[10px]">
                      <p className="text-lg text-white">{cart?.length || 0}</p>
                    </div>
                  </button>
                </NavLink>

                {user ? (
                  <>
                    <li className="flex justify-center items-center text-[15px] xl:text-xl text-white font-bold">
                      {user?.displayName}
                    </li>
                    <li className="flex justify-center">
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline-primary text-xl text-white font-bold ps-5"
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
            </div>
            <div className="-mr-2 flex lg:hidden">
              <a
                onClick={toggleNavbar}
                href="#"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-start">
            <NavLink
              to="/"
              onClick={closeNavbar}
              className="links text-white text-xl px-3 pb-3 font-bold block"
            >
              Home
            </NavLink>
            <NavLink
              onClick={closeNavbar}
              to="/menu"
              className="link text-xl text-white px-3 pb-3 font-bold block"
            >
              Menu
            </NavLink>
            <NavLink
              onClick={closeNavbar}
              to="/dashboard"
              className="text-xl text-white px-3 pb-6 font-bold block"
            >
              Dashboard
            </NavLink>

            <NavLink
              onClick={closeNavbar}
              to="/dashboard/mycart"
              className="text-lg px-3 pb-3 block"
            >
              <button className="btn relative">
                <FaShoppingCart className="text-2xl text-white" />
                <div className=" absolute top-[-18px] left-[15px]">
                  <p className="text-xl font-medium text-white">
                    {cart?.length || 0}
                  </p>
                </div>
              </button>
            </NavLink>
            {user ? (
              <>
                <li className="lg:flex justify-center items-center text-lg text-white ps-2 pt-5">
                  {user?.displayName}
                </li>
                <li className="lg:flex justify-center pt-5">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-primary text-lg ms-3"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <NavLink
                  onClick={closeNavbar}
                  to="/login"
                  className="text-xl text-white font-bold px-3 pb-3"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
