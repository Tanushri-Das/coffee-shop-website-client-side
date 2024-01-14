import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AddReview = () => {
  const { user } = useAuth();
  console.log(user.displayName);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name,email, designation, rateus, review } = data;
          const newReview = {
            name,
            email,
            designation,
            rateus,
            review,
            image: imgURL,
          };
          console.log(newReview);
          axiosSecure.post("/reviews", newReview).then((data) => {
            console.log("after posting new review", data.data);
            reset();
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Review added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  console.log("img_hosting_token", img_hosting_token);
  return (
    <div className="my-16">
      
      <h1 className="text-black text-center text-xl sm:text-3xl mb-6 font-bold">
      Give Review
      </h1>
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="form p-6 bg-white rounded-xl w-full md:w-3/4 lg:w-1/2 mx-auto"
        >
          <div className="mb-1">
            <label className="block text-black text-lg font-bold mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              value={user.displayName}
              className="form-input font-normal text-[16px]"
            />
          </div>
          <div className="mb-1">
            <label className="block text-black text-lg font-bold mb-1">
              Email
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              value={user.email}
              className="form-input font-normal text-[16px]"
            />
          </div>
          <div className="mb-1">
            <label className="block text-black text-lg font-bold mb-1">
             Designation
            </label>
            <input
              type="text"
              {...register("designation", { required: true })}
              placeholder="Designation"
              className="form-input font-normal text-[16px]"
            />
          </div>
          <div className="mb-1">
            <label className="block text-black text-lg font-semibold mb-1">
              Image *
            </label>
            <input
              type="file"
              className="text-base"
              {...register("image", { required: true })}
            />
          </div>
          <div className="mb-1">
            <label className="block text-black text-lg font-bold mb-1">
              Rate Us
            </label>
            <select
              className="form-input font-normal text-[16px]"
              {...register("rateus", { required: true })}
            >
              <option>1</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-black text-lg font-bold mb-1">
              Description
            </label>
            <textarea
              className="form-input w-full text-[16px] font-medium h-24"
              placeholder="Review in detail"
              {...register("review", { required: true })}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button className="btn login-btn text-white font-bold text-base">
              Submit
            </button>
          </div>
        </form>
    </div>
  );
};

export default AddReview;
