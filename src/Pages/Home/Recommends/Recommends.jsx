import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Recommend from "./Recommend";

const Recommends = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: menu = [], refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu");
      return res.data;
    },
  });

  // Filter the menu data to get only the items with category "recommend"
  const recommendItems = menu.filter(
    (item) => item.recommendation === "recommend"
  );
  console.log(recommendItems);

  return (
    <div className="mb-20 md:mx-12 xl:mx-[135px]">
      <h2 className="text-4xl font-bold mb-5 text-center">Chef Recommends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {recommendItems.map((recommend) => (
          <Recommend key={recommend._id} recommend={recommend} />
        ))}
      </div>
    </div>
  );
};

export default Recommends;
