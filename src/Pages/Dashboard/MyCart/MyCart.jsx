import React, { useEffect, useState } from "react";
import "./MyCart.css";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { modifyQuantity } from "../../../redux/cartSlice";
import useCart from "../../../Hooks/useCart";

const MyCart = () => {
  const [cart, refetch] = useCart();
  console.log("my", cart);
  const [itemQuantities, setItemQuantities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const initialQuantities =
      JSON.parse(localStorage.getItem("itemQuantities")) || {};

    cart.forEach((item) => {
      if (!(item._id in initialQuantities)) {
        initialQuantities[item._id] = 1;
      }
    });

    setItemQuantities(initialQuantities);
  }, [cart]);

  const updateLocalStorage = (newQuantities) => {
    localStorage.setItem("itemQuantities", JSON.stringify(newQuantities));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price);
      if (!isNaN(itemPrice)) {
        return itemPrice * (itemQuantities[item._id] || 0) + sum;
      } else {
        console.error(`Invalid price for item: ${item.price}`);
        return sum;
      }
    }, 0);
  };

  const total = calculateTotal();
  const formattedTotal = total.toFixed(2);

  //   const handleModifyQuantity = (itemId, quantityDelta) => {
  //     // Dispatch the modifyQuantity action
  //     dispatch(modifyQuantity({ itemId, quantityDelta }));

  //     const newQuantities = {
  //       ...itemQuantities,
  //       [itemId]: (itemQuantities[itemId] || 0) + quantityDelta,
  //     };
  //     setItemQuantities(newQuantities);
  //     updateLocalStorage(newQuantities);
  //   };

  const handleModifyQuantity = (itemId, quantityDelta) => {
    // Dispatch the modifyQuantity action
    dispatch(modifyQuantity({ itemId, quantityDelta }));

    const currentQuantity = itemQuantities[itemId] || 0;

    // Ensure that the quantity won't go below 1
    const newQuantity = Math.max(currentQuantity + quantityDelta, 1);

    const newQuantities = {
      ...itemQuantities,
      [itemId]: newQuantity,
    };
    setItemQuantities(newQuantities);
    updateLocalStorage(newQuantities);
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://coffee-shop-website-server-side.vercel.app/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your item has been deleted. successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="font-bold uppercase flex justify-center mt-16 items-center">
        <h3 className="text-3xl">My Cart</h3>
      </div>
      <div className="mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.item_name}</td>
                <td className="flex justify-center">
                  <img src={item.image} alt="" />
                </td>
                <td className="quantity">
                  <div className="flex justify-center">
                    <FaMinus
                      onClick={() => handleModifyQuantity(item._id, -1)}
                      className="quantity-icon"
                    />
                    <span className="mx-5">
                      {itemQuantities[item._id] || 0}
                    </span>
                    <FaPlus
                      onClick={() => handleModifyQuantity(item._id, 1)}
                      className="quantity-icon"
                    />
                  </div>
                </td>
                <td className="price">
                  ${(item.price * itemQuantities[item._id]).toFixed(2)}
                </td>
                <td className="action">
                  <button
                    onClick={() => handleDelete(item)}
                    className="delete-btn"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="total">Total Amount: ${formattedTotal}</p>
    </div>
  );
};

export default MyCart;
