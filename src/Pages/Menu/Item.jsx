import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Menu.css";
import { addToCart } from "../../redux/cartSlice";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const Item = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [, refetch] = useCart();
  const location = useLocation();
  const { searchTerm, category, priceFilter } = useSelector(
    (state) => state.search
  );
  const { min: minPrice, max: maxPrice } = priceFilter;
  const dispatch = useDispatch();

  const isItemVisible =
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    (minPrice === 0 || item.price >= minPrice) &&
    (maxPrice === 0 || item.price <= maxPrice);

  const handleAddToCart = (product) => {
    if (user && user.email) {
      const { _id, item_name, price, image } = product;

      dispatch(addToCart({ _id, item_name, price, image, email: user.email }));
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

  if (!isItemVisible) {
    return null;
  }

  return (
    <div
      key={item._id}
      className="product hover:border-zinc-500 duration-300 hover:shadow-xl overflow-hidden"
    >
      <img src={item.image} alt={item.item_name} className="product-img" />
      <div className="mt-5 px-4">
        <p className="text-[16px] sm:text-xl mb-3 text-center font-semibold">
          {item.item_name}
        </p>
        <p className="text-[16px] sm:text-lg mb-2 text-center font-medium">
          Price : ${item.price}
        </p>
      </div>
      <div className="mt-20">
        <div className="btn-div">
          <button
            onClick={() => handleAddToCart(item)}
            className="add-to-cart bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 font-semibold rounded-lg text-[16px] sm:text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
