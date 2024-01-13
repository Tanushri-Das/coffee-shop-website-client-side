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
    <div>
      <div className="font-bold uppercase flex justify-center mt-16 items-center">
        <h3 className="text-3xl">Total items: {totalItems}</h3>
      </div>
      <div className="mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                ITEM IMAGE
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                ITEM NAME
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                PRICE
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {menu?.map((item, index) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  {index + 1}
                </td>
                <td className="flex justify-center">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  {item.item_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  ${item.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                  <button
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 ms-3"
                    onClick={() => handleEdit(item)}
                  >
                    <HiOutlinePencilAlt className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 ms-3"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
