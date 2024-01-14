import React from "react";
import './ChooseUs.css'
const ChooseUs = () => {
  const data = [
    {
      id: 1,
      image:
        "https://w7.pngwing.com/pngs/11/946/png-transparent-quality-control-computer-icons-quality-assurance-quality-miscellaneous-service-logo-thumbnail.png",
      title: "Best Quality",
    },
    {
      id: 2,
      image:
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/24-7-services-3230455-2690928.png",
      title: "24/7 Support",
    },
    {
        id: 3,
        image:
          "https://static.vecteezy.com/system/resources/thumbnails/013/695/803/small_2x/customer-satisfaction-icon-style-free-vector.jpg",
        title: "Customer Satisfaction",
      },
    {
      id: 4,
      image:
        "https://cdn0.iconfinder.com/data/icons/business-and-finance-4-11/100/line-98-512.png",
      title: "Expert Team",
    },
    
  ];

  return (
    <div className="mb-20 mx-3 md:mx-12 xl:mx-20">
      <h2 className="text-4xl font-bold mb-5 text-center">Why Choose Us</h2>

      <p className="text-[16px] text-center mb-8 px-16">
        Discover the reasons why our coffee shop stands out from the rest. We take pride in offering more than just a cup of coffee – we offer an experience crafted with passion and expertise.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((choose) => (
          <div className="choose-card flex flex-col justify-center items-center">
            <img src={choose.image} className="w-32 h-32" />
            <h5 className="my-4 text-center font-semibold text-xl">{choose.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUs;
