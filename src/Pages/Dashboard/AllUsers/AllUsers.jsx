import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleDelete = (user) => {
    console.log(user._id);
    Swal.fire({
      title: "Are you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((data) => {
          console.log("after posting new review", data.data);

          if (data.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
              timer: 3000, // Time in milliseconds (e.g., 3000ms = 3 seconds)
              showConfirmButton: false, // Hide the "OK" button
            });
          }
        });
      }
    });
  };
  const handleMakeAdmin = (user) => {
    fetch(
      `https://coffee-shop-website-server-side.vercel.app/users/admin/${user._id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an admin now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="my-10">
      <h3 className="text-xl md:text-3xl text-center mb-8">
        Total users : {users.length}
      </h3>

      <div className="overflow-x-auto">
        <div className="w-full md:w-3/4 mx-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-sm md:text-[16px]">#</th>
                <th className="text-sm md:text-[16px]">Name</th>
                <th className="text-sm md:text-[16px]">Email</th>
                <th className="text-sm md:text-[16px]">Role</th>
                <th className="text-sm md:text-[16px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td className="text-sm md:text-[16px]">{index + 1}</td>
                  <td className="text-sm md:text-[16px]">{user.name}</td>
                  <td className="text-sm md:text-[16px]">{user.email}</td>
                  <td className="text-sm md:text-[16px]">
                    {user.role === "admin" ? (
                      "admin"
                    ) : (
                      <button onClick={() => handleMakeAdmin(user)}>
                        <FaUserShield className="text-lg" />
                      </button>
                    )}
                  </td>
                  <td className="text-sm md:text-[16px]">
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-ghost bg-red-600 text-white btn-md"
                    >
                      <FaTrashAlt className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
