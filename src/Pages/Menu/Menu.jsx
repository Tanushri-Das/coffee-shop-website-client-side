import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight, FaMinus } from "react-icons/fa";
import "./Menu.css";
import {
  setSearchTerm,
  setCategory,
  selectSearch,
} from "../../redux/searchSlice";
import Item from "./Item";

const Menu = () => {
  const dispatch = useDispatch();
  const { searchTerm, category } = useSelector(selectSearch);
  const [books, setBooks] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("https://coffee-shop-website-server-side.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books.filter((book) => {
    const isMatchingCategory = category === "All" || book.category === category;
    const isMatchingPrice =
      (minPrice === 0 || book.price >= minPrice) &&
      (maxPrice === 0 || book.price <= maxPrice);

    return (
      book.item_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      isMatchingCategory &&
      isMatchingPrice
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = indexOfLastItem >= filteredBooks.length;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(filteredBooks.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(""));
  };

  const handleCategoryChange = (e) => {
    if (e.target.value !== "All") {
      dispatch(setCategory(e.target.value));
    } else {
      dispatch(setCategory(""));
    }
  };

  const handlePriceFilterApply = () => {
    if (minPrice > 0 && maxPrice > 0) {
      const updatedFilteredBooks = books.filter((book) => {
        const isMatchingCategory =
          category === "All" || book.category === category;
        const isMatchingPrice =
          (minPrice === 0 || book.price >= minPrice) &&
          (maxPrice === 0 || book.price <= maxPrice);

        return (
          book.item_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          isMatchingCategory &&
          isMatchingPrice
        );
      });

      setBooks(updatedFilteredBooks);
    } else {
      console.log("Please provide both minimum and maximum prices");
    }

    setMinPrice(0);
    setMaxPrice(0);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 667);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 667);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="mx-2 md:mx-4 lg:mx-12 py-12">
      <div className="flex flex-col xl:flex-row">
        <div className="flex flex-col md:flex-row xl:flex-col justify-around xl:justify-start items-center xl:items-start p-2 sm:p-4 md:py-8 md:px-8">
          <div className="flex flex-col items-start">
            <h2 className="text-[16px] sm:text-xl font-bold mb-3">Category</h2>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="all"
                value="All"
                onChange={() => dispatch(setCategory("All"))}
              />

              <label
                htmlFor="all"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                All
              </label>
            </div>
            {[
              "coffee",
              "sandwich",
              "pizza",
              "fried",
              "burger",
              "dessert",
              "drinks",
            ].map((cat) => (
              <div key={cat} className="flex justify-center items-center capitalize mb-2">
                <input
                  type="radio"
                  name="category"
                  id={cat}
                  value={cat}
                  checked={category === cat}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={cat}
                  className="ms-1 text-sm sm:text-[16px] font-semibold"
                >
                  {cat}
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center xl:items-start mt-5">
            <h2 className="text-[16px] text-center sm:text-xl font-bold mb-3">Price</h2>
            <div className="flex justify-center items-center mb-2">
              <input
                type="number"
                name="minPrice"
                placeholder="min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-16 sm:w-20 h-10 border-2 border-gray-200 ps-1 focus:outline-none"
              />
              <FaMinus className="mx-2" />
              <input
                type="number"
                name="maxPrice"
                placeholder="max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-16 sm:w-20 h-10 border-2 border-gray-200 me-2 ps-1 focus:outline-none"
              />
              <button
                onClick={handlePriceFilterApply}
                className="add-to-cart bg-orange-500 text-white px-4 py-3 font-semibold rounded-lg text-sm sm:text-[16px]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 px-2 mt-8 md:mt-0">
          <h2 className="text-xl sm:text-3xl font-bold text-center mb-5">
            Food Items
          </h2>
          <div className="w-full md:w-[500px] mx-auto mb-8">
            <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearch}
                className="outline-none p-3 text-black w-full md:w-[450px]"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gradient-to-r from-sky-500 to-indigo-500 add-to-cart text-[16px] rounded-lg font-semibold text-white px-8 py-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 md:mx-3">
            {currentItems?.map((item) => (
              <Item key={item._id} item={item} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {isSmallScreen ? (
              <>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`pagination-btn ${
                    isPrevDisabled ? "cursor-not-allowed" : ""
                  } px-4 py-2 rounded-l-md text-[16px] font-semibold ${
                    isPrevDisabled ? "text-gray-400" : "text-gray-900"
                  } flex items-center`}
                  disabled={isPrevDisabled}
                >
                  <FaArrowLeft className="mr-1" /> Prev
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`pagination-btn text-[16px] font-semibold ${
                    isNextDisabled ? "cursor-not-allowed" : ""
                  } px-4 py-2 ${
                    currentPage ===
                    Math.ceil(filteredBooks.length / itemsPerPage)
                      ? "rounded-r-md"
                      : ""
                  } ${
                    isNextDisabled ? "text-gray-400" : "text-gray-900"
                  } flex items-center`}
                  disabled={isNextDisabled}
                >
                  Next <FaArrowRight className="ml-1" />
                </button>
              </>
            ) : (
              <div className="flex">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`pagination-btn ${
                    isPrevDisabled ? "cursor-not-allowed" : ""
                  } px-4 py-2 rounded-l-md text-[16px] font-semibold ${
                    isPrevDisabled ? "text-gray-400" : "text-gray-900"
                  } flex items-center`}
                  disabled={isPrevDisabled}
                >
                  <FaArrowLeft className="mr-1" /> Prev
                </button>
                {Array.from(
                  { length: Math.ceil(filteredBooks.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`pagination-btn text-[16px] font-semibold ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white rounded-lg"
                          : "bg-white text-blue-500"
                      } px-4 py-2 ${index === 0 ? "rounded-l-md" : ""} ${
                        index ===
                        Math.ceil(filteredBooks.length / itemsPerPage) - 1
                          ? "rounded-r-md"
                          : ""
                      } ${
                        currentPage === index + 1
                          ? "text-white"
                          : "text-blue-500"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`pagination-btn text-[16px] font-semibold ${
                    isNextDisabled ? "cursor-not-allowed" : ""
                  } px-4 py-2 ${
                    currentPage ===
                    Math.ceil(filteredBooks.length / itemsPerPage)
                      ? "rounded-r-md"
                      : ""
                  } ${
                    isNextDisabled ? "text-gray-400" : "text-gray-900"
                  } flex items-center`}
                  disabled={isNextDisabled}
                >
                  Next <FaArrowRight className="ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
