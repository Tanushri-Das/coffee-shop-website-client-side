import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
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
  const handleMakeAdmin = user => {
    fetch(`https://coffee-shop-website-server-side.vercel.app/users/admin/${user._id}`,{
      method:'PATCH'
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data)
      if(data.modifiedCount){
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.name} is an admin now!`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  };
  return (
    <div>
      <div className="font-bold uppercase flex justify-center mt-16 items-center">
        <h3 className="text-3xl">Total users : {users.length}</h3>
      </div>
      <div className="mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-lg text-center font-medium"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-lg text-center font-medium"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(users) &&
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    {user.email}
                  </td>
                  <td className="text-lg">
                    {user.role === "admin" ? (
                      "admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className=""
                      >
                        <FaUserShield className="text-lg" />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium">
                    <button
                      onClick={() => handleDelete(user)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
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
  );
};

export default AllUsers;
