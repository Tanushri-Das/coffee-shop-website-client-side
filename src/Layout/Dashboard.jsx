import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import {
  FaShoppingCart,
  FaBars,
  FaUtensils,
  FaListUl,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
import { MdReviews } from "react-icons/md";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const [open, setOpen] = useState(true);

  // Function to check if the screen width is below a certain breakpoint
  const isSmallScreen = () => window.innerWidth <= 640; // You can adjust the breakpoint as needed

  return (
    <section className="flex gap-4">
      <div
        className={`bg-[#a865b5] ${
          open ? "w-52" : "w-16"
        } duration-500 text-gray-100 px-4 h-screen`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 gap-4 relative">
          <ul>
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/addItem"
                    activeClassName="active-link"
                    className="flex font-semibold"
                  >
                    {isSmallScreen() ? (
                      <FaUtensils className="text-lg mt-1 me-3" />
                    ) : (
                      <>
                        <FaUtensils className="text-lg mt-1 me-3" />
                        {open && "Add Item"}
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/manageItems"
                    activeClassName="active-link"
                    className="font-semibold flex"
                  >
                    {isSmallScreen() ? (
                      <FaListUl className="text-lg mt-1 me-3" />
                    ) : (
                      <>
                        <FaListUl className="text-lg mt-1 me-3" />
                        {open && "Manage Items"}
                      </>
                    )}
                  </NavLink>
                </li>

                <li className="mb-5">
                  <NavLink
                    to="/dashboard/allusers"
                    activeClassName="active-link"
                    className="font-semibold flex"
                  >
                    {isSmallScreen() ? (
                      <FaUsers className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <FaUsers className="text-lg mt-[2px] me-3" />
                        {open && "All Users"}
                      </>
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/mycart"
                    activeClassName="active-link"
                    className="uppercase flex relative" // Add 'relative' class here
                  >
                    {isSmallScreen() ? (
                      <>
                        <FaShoppingCart className="text-lg" />
                        <span className="badge badge-secondary rounded-full">
                          {cart?.length || 0}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="relative me-3">
                          <FaShoppingCart className="text-lg" />
                          {cart?.length > 0 && (
                            <div className="absolute top-[-18px] right-[-3px]">
                              <span className="badge badge-secondary rounded-full text-lg font-semibold">
                                {cart?.length}
                              </span>
                            </div>
                          )}
                        </div>
                        {open && "My Cart"}
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/addreview"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <MdReviews className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <MdReviews className="text-lg mt-[2px] me-3" />
                        {open && "Review"}
                      </>
                    )}
                  </NavLink>
                </li>
              </>
            )}

            <hr className="mb-5" />
            <li className="mb-5">
              <NavLink
                to="/"
                activeClassName="active-link"
                className="font-semibold flex"
              >
                {isSmallScreen() ? (
                  <AiFillHome className="text-lg mt-[2px] me-3" />
                ) : (
                  <>
                    <AiFillHome className="text-lg mt-[2px] me-3" />
                    {open && "Home"}
                  </>
                )}
              </NavLink>
            </li>
            <li className="mb-5">
              <NavLink
                to="/menu"
                activeClassName="active-link"
                className="font-semibold flex"
              >
                {isSmallScreen() ? (
                  <FaBars className="text-lg mt-[2px] me-3" />
                ) : (
                  <>
                    <FaBars className="text-lg mt-1 me-3" />
                    {open && "Menu"}
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="my-3 text-xl text-gray-900 font-semibold w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
