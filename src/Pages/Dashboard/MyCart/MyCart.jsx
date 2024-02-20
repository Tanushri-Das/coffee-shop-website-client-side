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
        fetch(
          `https://coffee-shop-website-server-side.vercel.app/carts/${item._id}`,
          {
            method: "DELETE",
          }
        )
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
    <div className="my-10">
      <h3 className="text-xl md:text-3xl text-center mb-8">My Cart</h3>
      <div className="overflow-x-auto table-container">
        <div className="w-full md:w-10/12 mx-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-sm md:text-[16px]">No.</th>
                <th className="text-sm md:text-[16px]">Product Name</th>
                <th className="text-sm md:text-[16px]">Quantity</th>
                <th className="text-sm md:text-[16px]">Price</th>
                <th className="text-sm md:text-[16px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-sm md:text-[16px]">{index + 1}</td>
                  <td className="text-sm md:text-[16px]">{item.item_name}</td>

                  <td className="quantity text-sm md:text-[16px]">
                    <div className="flex justify-center">
                      <FaMinus
                        onClick={() => handleModifyQuantity(item._id, -1)}
                        className="quantity-icon hover:cursor-pointer"
                      />
                      <span className="mx-5">
                        {itemQuantities[item._id] || 0}
                      </span>
                      <FaPlus
                        onClick={() => handleModifyQuantity(item._id, 1)}
                        className="quantity-icon hover:cursor-pointer"
                      />
                    </div>
                  </td>
                  <td className="price text-sm md:text-[16px]">
                    ${(item.price * itemQuantities[item._id]).toFixed(2)}
                  </td>
                  <td className="action text-sm md:text-[16px]">
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
      </div>
      <p className="total">Total Amount: ${formattedTotal}</p>
    </div>
  );
};

export default MyCart;
