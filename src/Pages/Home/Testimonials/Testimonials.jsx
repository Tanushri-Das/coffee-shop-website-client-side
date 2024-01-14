import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar, FaStarHalf } from "react-icons/fa";
import "./Testimonials.css";
import { RiDoubleQuotesR } from "react-icons/ri";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://coffee-shop-website-server-side.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    // Update the number of slides per view based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        // Medium screens
        setSwiperSlidesPerView(2);
      } else {
        // Small screens
        setSwiperSlidesPerView(1);
      }
    };

    // Initial call
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mb-20 mx-3 md:mx-12 xl:mx-20 relative">
      <h2 className="text-4xl font-bold mb-5 text-center">
        What Our Customers Say
      </h2>
      <p className="text-[16px] text-center mb-12 px-16">
      Hear from our satisfied customers about their experiences at Sip Coffee. We take pride in delivering exceptional coffee and a welcoming atmosphere. Check out their testimonials below:
    </p>
      <Swiper
        slidesPerView={swiperSlidesPerView}
        spaceBetween={30}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        modules={[Navigation]}
        className="mySwiper mt-10 h-80 relative"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} style={{ height: "100%" }}>
            <div className="flex flex-col border border-gray-200 rounded-xl px-5 pt-[33px] h-full">
              <div className="flex justify-between">
                <div>
                  <RiDoubleQuotesR className="text-5xl star-color " />
                </div>
                <div className="mb-6 flex justify-between items-center">
                  <div className="flex justify-center items-center">
                    {Array.from(
                      { length: Math.floor(review.rateus) },
                      (_, index) => (
                        <FaStar
                          key={index}
                          className="star-color text-lg me-2"
                        />
                      )
                    )}
                    {review.rateus % 1 === 0.5 && (
                      <FaStarHalf className="star-color text-lg" />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-[16px] my-5">{review.review}</p>
              <div className="flex items-center">
                <div>
                  <img
                    src={review.image}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="ms-[18px]">
                  <h1 className="text-xl font-semibold text-left">
                    {review.name}
                  </h1>
                  <h3 className="text-[16px] font-medium mb-4">
                    {review.designation}
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Left Border with Previous Button */}
      <div className="swiper-button-prev-container">
        <div className="swiper-button-prev">
          <FiChevronLeft />
        </div>
      </div>

      {/* Right Border with Next Button */}
      <div className="swiper-button-next-container">
        <div className="swiper-button-next">
          <FiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
