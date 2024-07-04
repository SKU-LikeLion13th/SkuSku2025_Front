import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProjectItem = ({ title, subtitle }) => (
  <div className='flex justify-center items-center w-full'>
  <button className='text-white bg-gray-400 rounded-md w-full h-[214px] mx-8'>
    <div className='text-start pl-8 pb-5'>
      <p className='text-3xl fontEB pt-16'>{title}</p>
      <p className='text-3xl fontEB'>{subtitle}</p>
    </div>
    <div className='self-end text-xl pb-7 pr-4'>&gt;</div>
  </button>
  </div>
);

const ProjectSlider = () => {

  const settings = {
    arrows: false,
    rows: 1,
    slidesToShow: 3,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    draggable: true,
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
    <div className='flex justify-center items-center'>
        <div className='w-[90%] mx-auto'>
          <Slider {...settings}>
          {trackData.map((track, index) => (
              <ProjectItem key={index} title={track.title} subtitle={track.subtitle} />
            ))}
          </Slider>
        </div>
    </div>
  );
};

export default ProjectSlider;

