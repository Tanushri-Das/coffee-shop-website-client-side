import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import useCart from "../../../Hooks/useCart";
import "./Recommends.css";

const Recommend = ({ recommend, isVisible }) => {
  const dispatch = useDispatch();
  const [, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (recommend) => {
    if (user && user.email) {
      const { _id, item_name, price, image } = recommend;

      dispatch(
        addToCart({ _id, item_name, price, image, email: user.email })
      );

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

  return (
    <div
      key={recommend._id}
      className={`product ${isVisible ? "fadeIn" : "hidden"}`}
    >
      <img
        src={recommend.image}
        alt={recommend.item_name}
        className="product-img"
      />
      <div className="mt-5 px-4">
        <p className="text-xl mb-3 text-center font-semibold">
          {recommend.item_name}
        </p>
        <p className="text-[16px] mb-2 text-center font-medium">
          Price : ${recommend.price}
        </p>
      </div>
      <div className="mt-20">
        <div className="btn-div">
          <button
            className="add-to-cart text-lg"
            onClick={() => handleAddToCart(recommend)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
