'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './MySlider.scss';
import { Pagination, Autoplay } from 'swiper/modules';

type Props = {
  sliders: {
    id: number;
    img: string;
  }[];
};

const MySlider = ({ sliders }: Props) => {
  const del = (id: number) => {};
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className="my-slider-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 10000, 
          disableOnInteraction: false, // Слайдер продовжує автоплей після взаємодії
        }}
        dir="rtl" 
      >
        {sliders.map((x, idx) => (
          <SwiperSlide key={x.id}>
            <img
              src={x.img.startsWith('/') ? x.img : process.env.NEXT_PUBLIC_SERVER + x.img}
              alt={`Slide ${idx + 1}`}
            />
            <div className="text">
              
              {isAdmin && <button onClick={() => del(x.id)}>Видалити</button>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySlider;
