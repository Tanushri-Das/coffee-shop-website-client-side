import React from "react";
import { Carousel, Typography, Button, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Banner = () => {
  const bannerdata = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/top-view-cup-coffee-with-roasted-beans_52683-32340.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704931200&semt=ais",
      title: "Premium Coffee Blends",
      desc: "Indulge in our premium coffee blends crafted from the finest beans around the world. Elevate your coffee experience with every sip.",
    },
    {
      id: 2,
      image:
        "https://image.slidesdocs.com/responsive-images/background/coffee-beans-white-coffee-cup-coffee-table-powerpoint-background_f4ab4a034a__960_540.jpg",
      title: "Cozy Coffee Atmosphere",
      desc: "Immerse yourself in our cozy coffee shop atmosphere. Relax, unwind, and savor the moment with every cup of our handcrafted coffee.",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/premium-photo/using-smartphone-with-burger-french-fries-coffee-set-wooden-background-copyspace-your-text_171194-226.jpg?w=2000",
      title: "Irresistible Fast Food Delights",
      desc: "Indulge in our irresistible fast food delights, meticulously crafted to satisfy your cravings. Each bite is a journey into the world of flavor and culinary excellence.",
    },
    {
      id: 4,
      image:
        "https://image.slidesdocs.com/responsive-images/background/coffee-american-drink-white-powerpoint-background_d0807fbdca__960_540.jpg",
      title: "Artisanal Coffee Experience",
      desc: "Embark on an artisanal coffee journey with our carefully curated selection. Impeccable taste and quality in every crafted cup.",
    },
    {
        id: 5,
        image: "https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148704223.jpg",
        title: "Cozy Corner Retreat",
        desc: "Escape to our cozy coffee corner, where the aroma of freshly brewed coffee welcomes you. Unwind in a tranquil atmosphere and experience a moment of pure bliss.",
      },
  ];

  return (
    <div>
      <Carousel transition={{ duration: 1.5 }} className="h-screen" navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )} prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}>
        {bannerdata.map((item) => (
          <div key={item.id} className="relative h-full w-full">
            <img
              src={item.image}
              alt={`image ${item.id}`}
              className="h-full w-full object-cover rounded-none"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/45">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-12 opacity-80"
                >
                  {item.desc}
                </Typography>
                <div className="flex justify-center gap-2">
                  <Link to="/menu">
                    <Button size="lg" color="white">
                      Explore
                    </Button>
                  </Link>

                  <Button size="lg" color="white" variant="text">
                    Gallery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
