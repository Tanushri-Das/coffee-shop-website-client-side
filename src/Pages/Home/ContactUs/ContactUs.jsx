import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import "./ContactUs.css";

const ContactUs = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { firstName, lastName, email, phone, message } = data;
    const newContact = { firstName, lastName, email, phone, message };
    console.log(newContact);
    axiosSecure.post("/contacts", newContact).then((data) => {
      reset();
      if (data.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Contact added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="contact mb-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form p-6 bg-white rounded-xl w-full md:w-3/4 lg:w-1/2 mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-6">
          <div>
            <div className="mb-3">
              <label className="block text-white text-lg font-semibold mb-1">
                First Name *
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="form-input text-base w-full"
                {...register("firstName", { required: true, maxLength: 90 })}
              />
            </div>
          </div>
          <div>
            {" "}
            <div className="mb-3">
              <label className="block text-white text-lg font-semibold mb-1">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="form-input text-base w-full"
                {...register("lastName", { required: true, maxLength: 90 })}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:gap-6">
          <div>
            <div className="mb-3">
              <label className="block text-white text-lg font-semibold mb-1">
                Email *
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="form-input text-base"
                {...register("email", { required: true, maxLength: 90 })}
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label className="block text-white text-lg font-semibold mb-1">
                Phone *
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                className="form-input text-base"
                {...register("phone", { required: true, maxLength: 90 })}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-white text-lg font-semibold mb-1">
            Message *
          </label>
          <textarea
            className="form-input h-24 text-base"
            placeholder="Your Message"
            {...register("message", { required: true })}
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="login-btn text-[16px] font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
