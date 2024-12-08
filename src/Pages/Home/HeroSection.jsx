// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import Swiper React components
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import img1 from "../../assets/Banner/1.png";
import img2 from "../../assets/Banner/2.jpg";
import img3 from "../../assets/Banner/3.jpg";

const Slider = () => {
  const sliderData = [
    {
      title: "Earn Money Anywhere",
      description:
        "Complete simple tasks and earn money from the comfort of your home or on the go.",
      image: img1,
    },
    {
      title: "Flexible Work Hours",
      description:
        "Work at your own pace and choose tasks that fit your schedule.",
      image: img2,
    },
    {
      title: "Join a Global Community",
      description:
        "Be part of a global community of taskers and collaborate with people worldwide.",
      image: img3,
    },
  ];

  return (
    <section id="hero" className="">
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="h-full"
      >
        {sliderData.map((banner, index) => (
          <SwiperSlide key={index} className="">
            <div className="flex flex-row-reverse items-center py-12 md:py-20 sm:p-20">
              <div className="w-1/2 md:w-1/2 h-[150px] sm:h-[500px]">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full rounded-xl"
                />
              </div>
              <div className="w-1/2 md:w-1/2">
                <h1 className="text-xl md:text-6xl font-bold mb-4">
                  {banner.title}
                </h1>
                <p className="text-sm md:text-2xl">{banner.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
