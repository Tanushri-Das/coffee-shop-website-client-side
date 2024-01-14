import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  return (
    <nav className="header-bg py-4 w-full fixed z-10 bg-opacity-30 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="mr-10 text-xl lg:text-3xl text-white font-mono font-bold flex-shrink-0">
            Sip Coffee
          </h1>
          <div className="flex items-center">
            <div className="hidden lg:block ml-auto">
              <div className="flex justify-center space-x-4">
                <a
                  href="/"
                  className="text-white px-3 py-2 rounded-md text-[15px] xl:text-lg font-medium"
                >
                  Home
                </a>
                <a
                  href="/menu"
                  className="text-white px-3 py-2 rounded-md text-[15px] xl:text-lg font-medium"
                >
                  Menu
                </a>

                <a
                  href="/dashboard"
                  className="text-white px-3 py-2 rounded-md text-[15px] xl:text-lg font-medium"
                >
                  Dashboard
                </a>

                <li className="flex justify-center items-center relative">
                  <Link to="/dashboard/mycart" className="text-lg">
                    <button className="btn relative">
                      <FaShoppingCart className="text-lg" />
                      <div className=" absolute top-[-2px] right-[10px]">
                        <p className="text-lg">{cart?.length || 0}</p>
                      </div>
                    </button>
                  </Link>
                </li>

                {user ? (
                  <>
                    <li className="flex justify-center items-center text-[15px] xl:text-lg text-white ps-2">
                      {user?.displayName}
                    </li>
                    <li className="flex justify-center">
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
                    <li className="flex justify-center">
                      <Link
                        className="btn btn-outline-primary text-lg "
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex lg:hidden">
              <a
                onClick={toggleNavbar}
                href="#"
                className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white"
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
            <a
              href="/"
              className="text-white px-3 py-2 rounded-md text-lg font-medium block"
            >
              Home
            </a>

            <a
              href="/menu"
              className="text-white px-3 py-2 rounded-md text-lg font-medium block"
            >
              Menu
            </a>
            <a
              href="/dashboard"
              className="text-white px-3 py-2 rounded-md text-lg font-medium block"
            >
              Dashboard
            </a>

            <li className="lg:flex justify-center items-center relative px-3 pt-4">
              <Link to="/dashboard/mycart" className="text-lg">
                <button className="btn relative">
                  <FaShoppingCart className="text-lg" />
                  <div className=" absolute top-[-2px] right-[10px]">
                    <p className="text-lg">{cart?.length || 0}</p>
                  </div>
                </button>
              </Link>
            </li>
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
                <li className="flex justify-center">
                  <Link
                    className="btn btn-outline-primary text-lg hover:text-black"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
