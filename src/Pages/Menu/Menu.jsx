import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../redux/searchSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Menu.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import useCart from "../../Hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  });
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("https://coffee-shop-website-server-side.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  const handleSearch = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePriceFilterChange = (e) => {
    const { name, value } = e.target;
    const [min, max] =
      value === "All"
        ? [0, Number.MAX_SAFE_INTEGER]
        : value === "Over-120"
        ? [120, Number.MAX_SAFE_INTEGER]
        : value.split("-").map(Number);

    setPriceFilter({ min, max });
  };
  const filteredMenu = menu.filter((product) => {
    const nameMatch = product.item_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryMatch =
      !selectedCategory || product.category === selectedCategory;

    const priceMatch =
      (!priceFilter.min || product.price >= priceFilter.min) &&
      (!priceFilter.max || product.price <= priceFilter.max);

    return nameMatch && categoryMatch && priceMatch;
  });

  const handleClearSearch = () => {
    dispatch(setSearchTerm(""));
    dispatch(setPriceFilter({ min: 0, max: 0 }));
  };
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredAndPaginatedMenu = filteredMenu.slice(startIndex, endIndex);

  useEffect(() => {
    // Enable/disable "Previous" and "Next" buttons based on current page
    setIsPrevDisabled(currentPage === 1);
    setIsNextDisabled(currentPage === Math.ceil(menu.length / itemsPerPage));
  }, [currentPage, menu.length, itemsPerPage]);

  const handleAddToCart = (product) => {
    if (user && user.email) {
      const { _id, item_name, price, image } = product;

      dispatch(addToCart({ _id, item_name, price, image, email: user.email })); // Update Redux store

      // Send request to backend to add item to cart
      fetch("https://coffee-shop-website-server-side.vercel.app/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: _id,
          item_name,
          price,
          image,
          email: user.email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Food added to the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col p-2 sm:p-4 md:py-5 md:px-8 xl:py-8 xl:px-10 bg-gray-200">
          <div className="flex flex-col items-start">
            <h2 className="text-[16px] sm:text-xl font-bold mb-3">Category</h2>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="coffee"
                value="Coffee"
                checked={selectedCategory === "coffee"}
                onChange={() => setSelectedCategory("coffee")}
              />
              <label
                htmlFor="coffee"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Coffee
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="sandwich"
                value="Sandwich"
                checked={selectedCategory === "sandwich"}
                onChange={() => setSelectedCategory("sandwich")}
              />
              <label
                htmlFor="sandwich"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Sandwich
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="pizza"
                value="Pizza"
                checked={selectedCategory === "pizza"}
                onChange={() => setSelectedCategory("pizza")}
              />
              <label
                htmlFor="pizza"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Pizza
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="fried"
                value="Fried"
                checked={selectedCategory === "fried"}
                onChange={() => setSelectedCategory("fried")}
              />
              <label
                htmlFor="fried"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Fried
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="burger"
                value="Burger"
                checked={selectedCategory === "burger"}
                onChange={() => setSelectedCategory("burger")}
              />
              <label
                htmlFor="burger"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Burger
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="dessert"
                value="Dessert"
                checked={selectedCategory === "dessert"}
                onChange={() => setSelectedCategory("dessert")}
              />
              <label
                htmlFor="dessert"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Dessert
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="category"
                id="drinks"
                value="Drinks"
                checked={selectedCategory === "drinks"}
                onChange={() => setSelectedCategory("drinks")}
              />
              <label
                htmlFor="drinks"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Drinks
              </label>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-[16px] sm:text-xl font-bold mb-3">Price</h2>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="price"
                id="price-All"
                value="All"
                onChange={handlePriceFilterChange}
              />
              <label
                htmlFor="price-All"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                All
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="price"
                id="price-0-40"
                value="0-40"
                onChange={handlePriceFilterChange}
              />
              <label
                htmlFor="price-0-40"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                0$-40$
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="price"
                id="price-40-80"
                value="40-80"
                onChange={handlePriceFilterChange}
              />
              <label
                htmlFor="price-40-80"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                40$-80$
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="price"
                id="price-80-120"
                value="80-120"
                onChange={handlePriceFilterChange}
              />
              <label
                htmlFor="price-80-120"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                80$-120$
              </label>
            </div>
            <div className="flex justify-center items-center mb-2">
              <input
                type="radio"
                name="price"
                id="price-Over-120"
                value="Over-120"
                onChange={handlePriceFilterChange}
              />
              <label
                htmlFor="price-Over-120"
                className="ms-1 text-sm sm:text-[16px] font-semibold"
              >
                Over 120$
              </label>
            </div>
          </div>
        </div>

        <div className="flex-1 px-2  py-12">
          <h2 className="text-xl sm:text-3xl font-bold text-center mb-5">
            Products
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer login-btn text-sm font-semibold text-white px-8 py-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:mx-4 xl:mx-20">
            {filteredAndPaginatedMenu.map((product) => {
              return (
                <div key={product.id} className="product">
                  <img
                    src={product.image}
                    alt={product.item_name}
                    className="product-img"
                  />
                  <div className="mt-5 px-4">
                    <p className="text-[16px] sm:text-xl mb-3 text-center font-semibold">
                      {product.item_name}
                    </p>
                    <p className="text-[16px] mb-2 text-center font-medium">
                      Price : ${product.price}
                    </p>
                  </div>
                  <div className="mt-20">
                    <div className="btn-div">
                      <button
                        className="add-to-cart text-[16px] sm:text-lg"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  <FaArrowLeft className="mr-2" /> Prev
                </button>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`pagination-btn text-[16px] font-semibold ${
                    isNextDisabled ? "cursor-not-allowed" : ""
                  } px-4 py-2 ${
                    currentPage === Math.ceil(menu.length / itemsPerPage)
                      ? "rounded-r-md"
                      : ""
                  } ${
                    isNextDisabled ? "text-gray-400" : "text-gray-900"
                  } flex items-center`}
                  disabled={isNextDisabled}
                >
                  Next <FaArrowRight className="ml-2" />
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
                  { length: Math.ceil(menu.length / itemsPerPage) },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`pagination-btn text-[16px] font-semibold ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white rounded-lg"
                          : "bg-white text-blue-500"
                      } px-4 py-2 ${index === 0 ? "rounded-l-md" : ""} ${
                        index === Math.ceil(menu.length / itemsPerPage) - 1
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
                    currentPage === Math.ceil(menu.length / itemsPerPage)
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
