import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { images } from '../../../utils/images';

const MainSlider = () => {
  const { mainImages } = images;

  const settings = {
    arrows: false,
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
    <div className='absolute top-0 left-0 w-full min-h-screen -z-10'>
      <Slider {...settings}>
        {mainImages.map((image, index) => (
          <div key={index} className="w-full  min-h-[220vh] xl:min-h-screen">
            <div 
              className='flex items-center justify-center w-full min-h-screen' 
              style={{ 
                backgroundImage: `url(${image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
