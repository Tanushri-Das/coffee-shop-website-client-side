import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import EditModal from "./EditModal";

import "./Modal.css";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [menu, setMenu] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const totalItems = menu ? menu.length : 0;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to fetch and update menu data
  const fetchMenuData = () => {
    axiosSecure
      .get("/menu")
      .then((res) => {
        // Update the 'menu' state with the fetched data
        setMenu(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Use useEffect to fetch data when the component mounts and set up polling
  useEffect(() => {
    fetchMenuData(); // Fetch data when the component mounts

    // Set up polling to fetch data every X seconds (e.g., every 10 seconds)
    const pollInterval = 3000; // 10 seconds
    const pollTimer = setInterval(() => {
      fetchMenuData(); // Fetch data periodically
    }, pollInterval);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(pollTimer);
    };
  }, []);
  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
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
      console.log(result);
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/menu/${item._id}`)
          .then((res) => {
            console.log("deleted res", res.data);
            if (res.data.deletedCount > 0) {
              fetchMenuData();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your item has been deleted. successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };
  return (
    <div className="my-10">
      <h3 className="text-xl md:text-3xl text-center mb-8">
        Total items : {totalItems}
      </h3>
      <div className="overflow-x-auto">
        <div className="w-full lg:w-3/4 mx-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-sm md:text-[16px]">#</th>
                <th className="text-sm md:text-[16px]">ITEM NAME</th>
                <th className="text-sm md:text-[16px]">Category</th>
                <th className="text-sm md:text-[16px]">PRICE</th>
                <th className="text-sm md:text-[16px]">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {menu?.map((item, index) => (
                <tr key={item._id}>
                  <td className="text-sm md:text-[16px]">{index + 1}</td>

                  <td className="text-sm md:text-[16px]">{item.item_name}</td>
                  <td className="text-sm md:text-[16px]">{item.category}</td>
                  <td className="text-sm md:text-[16px]">${item.price}</td>
                  <td className="text-sm md:text-[16px]">
                    <button
                      className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 ms-3"
                      onClick={() => handleEdit(item)}
                    >
                      <HiOutlinePencilAlt className="text-sm md:text-[16px]" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="ms-2 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700"
                    >
                      <FaTrashAlt className="text-sm md:text-[16px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditModal
        key={editModalOpen ? "open" : "close"}
        isOpen={editModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </div>
  );
};

export default ManageItems;
