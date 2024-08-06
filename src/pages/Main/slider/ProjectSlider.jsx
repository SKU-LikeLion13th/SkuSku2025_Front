import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const ProjectItem = ({ title, subtitle, image, url }) => (
  <a href={url} className='flex justify-center items-center w-full' target="_blank" rel="noopener noreferrer">
    <div className='relative w-1/2 xl:w-full h-[14rem] mx-8'>
      <div
        className='absolute inset-0 bg-cover bg-center rounded-md'
        style={{
          backgroundImage: `url(data:image/png;base64,${image})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50 rounded-md'></div>
      </div>
      <div className='relative z-10 text-start pl-6 h-full flex flex-col justify-end pb-6'>
        <div className='text-3xl font-bold text-white'>
          {title}
        </div>
        <p className='text-xl fontRegular text-white pt-2'>{subtitle}</p>
      </div>
    </div>
  </a>
);

const ProjectSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://back.sku-sku.com/project/all')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
    responsive: [
      {
        breakpoint: 1240, // 1240px 미만에서는 슬라이드 개수를 1로 설정
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-[90%] mx-auto px-[85px] xl:px-0'>
        <Slider {...settings}>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              title={project.title}
              subtitle={project.subTitle}
              image={project.image}
              url={project.url}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProjectSlider;
