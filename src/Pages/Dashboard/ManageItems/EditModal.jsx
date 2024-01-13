import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMenuItem } from "../../../redux/menuSlice";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const EditModal = ({ isOpen, onClose, item }) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const dispatch = useDispatch();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    if (isOpen || item !== editedItem) {
      setEditedItem({ ...item });
    }
  }, [isOpen, item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    axiosSecure
      .put(`/menu/${editedItem._id}`, {
        name: editedItem.item_name,
        price: editedItem.price,
      })
      .then((res) => {
        if (res.status === 200) {
          // Dispatch the updateMenuItem action with the updated item
          dispatch(updateMenuItem(editedItem));

          // Close the modal
          onClose();
        } else {
          console.error("Failed to update item");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isOpen && (
        <div
          className={`overlay ${isOpen ? "open" : ""}`}
          onClick={onClose}
        ></div>
      )}
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-box">
          <h2 className="font-semibold text-xl">Edit Item</h2>
          <hr className="my-3" />
          <div className="mb-2 text-start flex flex-col">
            <label
              htmlFor="ServiceName"
              className="block text-black text-lg font-semibold mb-1"
            >
              Item Name
            </label>
            <input
              type="text"
              name="item_name"
              value={editedItem.item_name}
              readOnly
              className="form-input w-full text-[16px] font-medium"
            />
          </div>
          <div className="mb-5 text-start flex flex-col">
            <label
              htmlFor="ServicePrice"
              className="block text-black text-lg font-semibold mb-1"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={editedItem.price}
              onChange={handleInputChange}
              className="form-input w-full text-[16px] font-medium"
            />
          </div>
          <div className="flex justify-evenly">
            <button
              className="btn bg-green-600 text-[16px] font-medium text-white py-2 px-4 rounded-lg"
              onClick={() => {
                handleSaveChanges();

                onClose();
              }}
            >
              Save Changes
            </button>

            <button
              className="btn bg-red-600 text-[16px] font-medium text-white py-2 px-4 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
