import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="my-20 md:mx-12 xl:mx-[135px]">
      <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <img
            src="https://infomedia.com/wp-content/uploads/coffee-on-table-637x382.jpg"
            className="w-full h-full object-cover rounded-none"
            alt="Coffee on Table"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-3">
            Crafted with Passion, Brewed with Excellence
          </h2>
          <p className="mb-3 text-justify">
            At Our Coffee Haven, we believe that the essence of a good cup of
            coffee lies in the passion that goes into crafting it. Our beans
            are carefully selected from the finest coffee plantations around
            the world to ensure a rich and robust flavor profile.
          </p>
          <p className="text-justify">
            Every step of our coffee-making process is a labor of love, from
            roasting to brewing. We prioritize quality and strive for
            perfection, making every sip a delightful experience for our
            customers.
          </p>
          <Link to="/" className="my-4">
            <button className="bg-amber-500 px-5 py-3 rounded-lg text-white font-semibold text-lg">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
