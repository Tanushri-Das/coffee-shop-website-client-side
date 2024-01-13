import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import {
  FaShoppingCart,
  FaShoppingBag,
  FaUsers,
  FaUserPlus,
  FaPlus,
  FaGripHorizontal,
  FaUtensils,
  FaListUl,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { MdReviews } from "react-icons/md";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
// import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [cart] = useCart();

  const [isAdmin] = useAdmin();

  // Function to check if the screen width is below a certain breakpoint
  const isSmallScreen = () => window.innerWidth <= 640; // You can adjust the breakpoint as needed

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#a865b5] ${
          open ? "w-60" : "w-16"
        } duration-500 text-white font-semibold px-4`}
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
                {/* <li className="mb-5">
                  <NavLink
                    to="/dashboard/adminhome"
                    activeClassName="active-link text-white"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <AiFillHome className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <AiFillHome className="text-lg mt-[2px] me-3" />
                        {open && "Admin Home"}
                      </>
                    )}
                  </NavLink>
                </li> */}
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/allusers"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaUsers className="text-lg mt-[2px] me-3" />
                    ) : (
                      <>
                        <FaUsers className="text-lg mt-[2px] me-3" />
                        {open && "Users"}
                      </>
                    )}
                  </NavLink>
                </li>

                <li className="mb-5">
                  <NavLink
                    to="/dashboard/addItem"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaUtensils className="text-lg mt-1 me-3" />
                    ) : (
                      <>
                        <FaUtensils className="text-lg mt-1 me-3" />
                        {open && "add items"}
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="mb-5">
                  <NavLink
                    to="/dashboard/manageItems"
                    activeClassName="active-link"
                    className="uppercase flex"
                  >
                    {isSmallScreen() ? (
                      <FaListUl className="text-lg mt-1 me-3" />
                    ) : (
                      <>
                        <FaListUl className="text-lg mt-1 me-3" />
                        {open && "manage items"}
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

            <div className="divider"></div>
            <li className="mb-5">
              <NavLink
                to="/"
                activeClassName="active-link"
                className="uppercase flex"
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
          </ul>
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold md:w-3/4 mx-auto">
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
