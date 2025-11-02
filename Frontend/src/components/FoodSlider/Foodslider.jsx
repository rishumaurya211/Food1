import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import logo from "../../assets/logo.png"
import { Pagination, Autoplay } from "swiper/modules";

const foodItems = [
  { id: 2, name: "Burger", image: logo },
  { id: 3, name: "Pasta", image: "/images/pasta.jpg" },
  { id: 4, name: "Sushi", image: "/images/sushi.jpg" },
  { id: 5, name: "Salad", image: "/images/salad.jpg" },
];

const FoodSlider = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        className="rounded-lg shadow-lg"
      >
        {foodItems.map((food) => (
          <SwiperSlide key={food.id}>
            <div className="relative w-full h-64">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                {food.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodSlider;
