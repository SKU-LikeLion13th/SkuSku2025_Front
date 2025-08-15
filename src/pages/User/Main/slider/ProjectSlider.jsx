import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API from "../../../../utils/axios";

const ProjectItem = ({ title, subtitle, imageUrl, projectUrl }) => {
  const Card = (
    <div className="relative w-3/5 xl:w-full h-[14rem] mx-8 rounded-[15px] overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/50 rounded-[15px]" />
      <div className="relative z-10 flex flex-col justify-end h-full pb-6 pl-6 text-start">
        <div className="text-3xl fontEB text-white">{title}</div>
        <p className="pt-2 text-xl text-white fontRegular">{subtitle}</p>
      </div>
    </div>
  );

  // URL이 있으면 링크, 없으면 카드만 표시
  return projectUrl ? (
    <a
      href={projectUrl}
      className="flex justify-center items-center w-full"
      target="_blank"
      rel="noopener noreferrer"
    >
      {Card}
    </a>
  ) : (
    <div className="flex justify-center items-center w-full cursor-default">{Card}</div>
  );
};

const ProjectSlider = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/project/all")
      .then((response) => {
        setProjects(response.data || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
        breakpoint: 1280,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[85%] mx-auto">
        <Slider {...settings}>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              title={project.title}
              subtitle={project.subTitle}
              imageUrl={project.imageUrl}
              projectUrl={project.projectUrl}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProjectSlider;