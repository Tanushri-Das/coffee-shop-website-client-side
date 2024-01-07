// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchTerm } from "../../redux/searchSlice";
// import "./Menu.css";

// const Menu = () => {
//   const dispatch = useDispatch();
//   const searchTerm = useSelector((state) => state.search.searchTerm);
//   const [priceFilter, setPriceFilter] = useState({
//     min: 0,
//     max: Number.MAX_SAFE_INTEGER,
//   });
//   const [menu, setMenu] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/menu")
//       .then((res) => res.json())
//       .then((data) => {
//         setMenu(data);
//       });
//   }, []);

//   const handleSearch = (event) => {
//     dispatch(setSearchTerm(event.target.value));
//   };

//   const handlePriceFilterChange = (e) => {
//     const { name, value } = e.target;
//     const [min, max] =
//       value === "All"
//         ? [0, Number.MAX_SAFE_INTEGER]
//         : value === "Over-120"
//         ? [120, Number.MAX_SAFE_INTEGER]
//         : value.split("-").map(Number);

//     setPriceFilter({ min, max });
//   };
//   const filteredMenu = menu.filter((product) => {
//     const nameMatch = product.item_name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     // Check if priceFilter is not null before accessing its properties
//     const priceMatch =
//       !priceFilter ||
//       ((!priceFilter.min || product.price >= priceFilter.min) &&
//         (!priceFilter.max || product.price <= priceFilter.max));

//     return nameMatch && priceMatch;
//   });

//   const handleClearSearch = () => {
//     dispatch(setSearchTerm(""));
//     dispatch(setPriceFilter({ min: 0, max: 0 }));
//   };

//   return (
//     <div>
//       <div className="flex">
//         <div className="flex flex-col items-start p-4 md:py-5 md:px-8 xl:py-8 xl:px-10 bg-gray-200">
//           <h2 className="text-xl font-bold mb-3">Price</h2>
//           <div className="flex justify-center items-center mb-2">
//             <input
//               type="radio"
//               name="price"
//               id="price-All"
//               value="All"
//               onChange={handlePriceFilterChange}
//             />
//             <label
//               htmlFor="price-All"
//               className="ms-1 text-[16px] font-semibold"
//             >
//               All
//             </label>
//           </div>
//           <div className="flex justify-center items-center mb-2">
//             <input
//               type="radio"
//               name="price"
//               id="price-0-40"
//               value="0-40"
//               onChange={handlePriceFilterChange}
//             />
//             <label
//               htmlFor="price-0-40"
//               className="ms-1 text-[16px] font-semibold"
//             >
//               0$-40$
//             </label>
//           </div>
//           <div className="flex justify-center items-center mb-2">
//             <input
//               type="radio"
//               name="price"
//               id="price-40-80"
//               value="40-80"
//               onChange={handlePriceFilterChange}
//             />
//             <label
//               htmlFor="price-40-80"
//               className="ms-1 text-[16px] font-semibold"
//             >
//               40$-80$
//             </label>
//           </div>
//           <div className="flex justify-center items-center mb-2">
//             <input
//               type="radio"
//               name="price"
//               id="price-80-120"
//               value="80-120"
//               onChange={handlePriceFilterChange}
//             />
//             <label
//               htmlFor="price-80-120"
//               className="ms-1 text-[16px] font-semibold"
//             >
//               80$-120$
//             </label>
//           </div>
//           <div className="flex justify-center items-center mb-2">
//             <input
//               type="radio"
//               name="price"
//               id="price-Over-120"
//               value="Over-120"
//               onChange={handlePriceFilterChange}
//             />
//             <label
//               htmlFor="price-Over-120"
//               className="ms-1 text-[16px] font-semibold"
//             >
//               Over 120$
//             </label>
//           </div>
//         </div>
//         <div className="flex-1 px-4 py-12">
//           <h2 className="text-3xl font-bold text-center mb-5">Products</h2>
//           <div className="w-full md:w-[500px] mx-auto mb-8">
//             <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
//               <div className="grid place-items-center h-full w-12 text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="outline-none p-3 text-black w-full md:w-[450px]"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={handleClearSearch}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer login-btn text-sm font-semibold text-white px-8 py-2"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-2 md:mx-10 xl:mx-20">
//             {filteredMenu.map((product) => {
//               return (
//                 <div key={product.id} className="product">
//                   <img
//                     src={product.image}
//                     alt={product.item_name}
//                     className="product-img"
//                   />
//                   <div className="mt-5 px-4">
//                     <p className="text-xl mb-3 text-center font-semibold">
//                       {product.item_name}
//                     </p>
//                     <p className="text-[16px] mb-2 text-center font-medium">
//                       Price : ${product.price}
//                     </p>
//                   </div>
//                   <div className="mt-20">
//                     <div className="btn-div">
//                       <button
//                         className="add-to-cart text-lg"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchTerm } from "../../redux/searchSlice";
// import "./Menu.css";

// const Menu = () => {
//   const dispatch = useDispatch();
//   const searchTerm = useSelector((state) => state.search.searchTerm);
//   const [priceFilter, setPriceFilter] = useState({
//     min: 0,
//     max: Number.MAX_SAFE_INTEGER,
//   });
//   const [menu, setMenu] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/menu")
//       .then((res) => res.json())
//       .then((data) => {
//         setMenu(data);
//       });
//   }, []);

//   const handleSearch = (event) => {
//     dispatch(setSearchTerm(event.target.value));
//   };

//   const handlePriceFilterChange = (e) => {
//     const { name, value } = e.target;
//     const [min, max] =
//       value === "All"
//         ? [0, Number.MAX_SAFE_INTEGER]
//         : value === "Over-120"
//         ? [120, Number.MAX_SAFE_INTEGER]
//         : value.split("-").map(Number);

//     setPriceFilter({ min, max });
//   };
//   const filteredMenu = menu.filter((product) => {
//     const nameMatch = product.item_name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     console.log(nameMatch);
//     const categoryMatch =
//       !selectedCategory || product.category === selectedCategory;
//     console.log(categoryMatch);

//     const priceMatch =
//       (!priceFilter.min || product.price >= priceFilter.min) &&
//       (!priceFilter.max || product.price <= priceFilter.max);

//     return nameMatch && categoryMatch && priceMatch;
//   });

//   const handleClearSearch = () => {
//     dispatch(setSearchTerm(""));
//     dispatch(setPriceFilter({ min: 0, max: 0 }));
//   };

//   return (
//     <div>
//       <div className="flex">
//         <div className="flex flex-col  p-4 md:py-5 md:px-8 xl:py-8 xl:px-10 bg-gray-200">
//           <div className="flex flex-col items-start">
//             <h2 className="text-xl font-bold mb-3">Category</h2>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="category"
//                 id="coffee"
//                 value="Coffee"
//                 checked={selectedCategory === "coffee"}
//                 onChange={() => setSelectedCategory("coffee")}
//               />
//               <label
//                 htmlFor="coffee"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 Coffee
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="category"
//                 id="sandwich"
//                 value="Sandwich"
//                 checked={selectedCategory === "sandwich"}
//                 onChange={() => setSelectedCategory("sandwich")}
//               />
//               <label
//                 htmlFor="sandwich"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 Sandwich
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="category"
//                 id="pizza"
//                 value="Pizza"
//                 checked={selectedCategory === "pizza"}
//                 onChange={() => setSelectedCategory("pizza")}
//               />
//               <label htmlFor="pizza" className="ms-1 text-[16px] font-semibold">
//                 Pizza
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="category"
//                 id="fried"
//                 value="Fried"
//                 checked={selectedCategory === "fried"}
//                 onChange={() => setSelectedCategory("fried")}
//               />
//               <label htmlFor="fried" className="ms-1 text-[16px] font-semibold">
//                 Fried
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="category"
//                 id="burger"
//                 value="Burger"
//                 checked={selectedCategory === "burger"}
//                 onChange={() => setSelectedCategory("burger")}
//               />
//               <label
//                 htmlFor="burger"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 Burger
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="category"
//                 id="dessert"
//                 value="Dessert"
//                 checked={selectedCategory === "dessert"}
//                 onChange={() => setSelectedCategory("dessert")}
//               />
//               <label
//                 htmlFor="dessert"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 Dessert
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="category"
//                 id="drinks"
//                 value="Drinks"
//                 checked={selectedCategory === "drinks"}
//                 onChange={() => setSelectedCategory("drinks")}
//               />
//               <label
//                 htmlFor="drinks"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 Drinks
//               </label>
//             </div>
//           </div>
//           <div className="flex flex-col items-start">
//             <h2 className="text-xl font-bold mb-3">Price</h2>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-All"
//                 value="All"
//                 onChange={handlePriceFilterChange}
//               />
//               <label
//                 htmlFor="price-All"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 All
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-0-40"
//                 value="0-40"
//                 onChange={handlePriceFilterChange}
//               />
//               <label
//                 htmlFor="price-0-40"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 0$-40$
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-40-80"
//                 value="40-80"
//                 onChange={handlePriceFilterChange}
//               />
//               <label
//                 htmlFor="price-40-80"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 40$-80$
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-80-120"
//                 value="80-120"
//                 onChange={handlePriceFilterChange}
//               />
//               <label
//                 htmlFor="price-80-120"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 80$-120$
//               </label>
//             </div>
//             <div className="flex justify-center items-center mb-2">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-Over-120"
//                 value="Over-120"
//                 onChange={handlePriceFilterChange}
//               />
//               <label
//                 htmlFor="price-Over-120"
//                 className="ms-1 text-[16px] font-semibold"
//               >
//                 Over 120$
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 px-4 py-12">
//           <h2 className="text-3xl font-bold text-center mb-5">Products</h2>
//           <div className="w-full md:w-[500px] mx-auto mb-8">
//             <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
//               <div className="grid place-items-center h-full w-12 text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="outline-none p-3 text-black w-full md:w-[450px]"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={handleClearSearch}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer login-btn text-sm font-semibold text-white px-8 py-2"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-2 md:mx-10 xl:mx-20">
//             {filteredMenu.map((product) => {
//               return (
//                 <div key={product.id} className="product">
//                   <img
//                     src={product.image}
//                     alt={product.item_name}
//                     className="product-img"
//                   />
//                   <div className="mt-5 px-4">
//                     <p className="text-xl mb-3 text-center font-semibold">
//                       {product.item_name}
//                     </p>
//                     <p className="text-[16px] mb-2 text-center font-medium">
//                       Price : ${product.price}
//                     </p>
//                   </div>
//                   <div className="mt-20">
//                     <div className="btn-div">
//                       <button
//                         className="add-to-cart text-lg"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;