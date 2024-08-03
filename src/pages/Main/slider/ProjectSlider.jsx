import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const ProjectItem = ({ title, subtitle, image, url }) => (
  <div className='flex justify-center items-center w-full'>
    <div className='relative w-full h-[14rem] mx-8'>
      <div
        className='absolute inset-0 bg-cover bg-center rounded-md'
        style={{
          backgroundImage: `url(data:image/png;base64,${image})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50 rounded-md'></div>
      </div>
      <div className='relative z-10 text-start pl-6 h-full flex flex-col justify-end pb-6'>
        <a href={url} className='text-3xl fontBold text-white' target="_blank" rel="noopener noreferrer">
          {title}
        </a>
        <p className='text-xl fontRegular text-white pt-2'>{subtitle}</p>
      </div>
    </div>
  </div>
);

const ProjectSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://back.sku-sku.com/project/all')
      .then(response => {
        setProjects(response.data);
        console.log(projects);
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
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-[90%] mx-auto'>
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
