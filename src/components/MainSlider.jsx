import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { images } from '../utils/images';

const MainSlider = () => {
  const { mainImages } = images;

  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true, 
  };

  return (
    <div className='relative'>
    <Slider {...settings}>
      {mainImages.map((image) => (
        <div key={image.id}>
          <img src={image.src} alt={image.alt} className='w-full h-full object-cover' />
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default MainSlider;