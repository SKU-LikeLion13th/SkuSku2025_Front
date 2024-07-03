import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { images } from '../../utils/images';

const ProjectItem = ({ title, subtitle }) => (
  <button className=' text-white bg-gray-400 rounded-md w-[350px] h-[214px]'>
    <div className='text-start pl-8 pb-5'>
      <p className='text-3xl fontEB pt-16'>{title}</p>
      <p className='text-3xl fontEB'>{subtitle}</p>
    </div>
    <div className='self-end text-xl pb-7 pr-4'>&gt;</div>
  </button>
);

const ProjectSlider = () => {
  const { mainImages } = images;

  const settings = {
    rows: 1,
    slidesToShow: 3,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: false,
  };

  const trackData = [
    { title: '프론트엔드', subtitle: 'FRONT-END' },
    { title: '백엔드', subtitle: 'BACK-END' },
    { title: '기획/디자인', subtitle: 'PM/DESIGN' },
    { title: '기획/디자인', subtitle: 'PM/DESIGN' },
    { title: '백엔드', subtitle: 'BACK-END' },
    { title: '프론트엔드', subtitle: 'FRONT-END' },
  ];

  return (
    <div>
        <div className='w-full'>
          <Slider {...settings}>
          {mainImages.map((image) => (
            <div key={image.id}>
              <img src={image.src} alt={image.alt} className='w-1/4 h-10 object-cover' />
            </div>
          ))}
          </Slider>
        </div>
    </div>
  );
};

export default ProjectSlider;
