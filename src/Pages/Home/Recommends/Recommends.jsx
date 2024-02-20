import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Recommend from "./Recommend";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Recommends.css";

const Recommends = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: menu = [] } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu");
      return res.data;
    },
  });

  const [startIndex, setStartIndex] = useState(0);

  const recommendItems = menu.filter(
    (item) => item.recommendation === "recommend"
  );

  const handleNext = () => {
    if (startIndex + 3 < recommendItems.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isNextDisabled = startIndex + 3 >= recommendItems.length;
  const isPrevDisabled = startIndex === 0;

  return (
    <div className="mb-20 mx-3 md:mx-12 xl:mx-20">
      <h2 className="text-4xl font-bold mb-8 md:mb-4 text-center">
        Chef Recommends
      </h2>
      <div className="flex justify-end items-center">
        <div
          onClick={handlePrev}
          className={`rounded-icon ${isPrevDisabled ? "disabled" : ""}`}
        >
          <FaArrowLeft />
        </div>
        <div
          onClick={handleNext}
          className={`rounded-icon ${isNextDisabled ? "disabled" : ""}`}
        >
          <FaArrowRight />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
        {recommendItems
          .slice(startIndex, startIndex + 3)
          .map((recommend, index) => (
            <Recommend
              key={recommend._id}
              recommend={recommend}
              isVisible={index === 0 || index === 1 || index === 2}
            />
          ))}
      </div>
    </div>
  );
};

export default Recommends;
