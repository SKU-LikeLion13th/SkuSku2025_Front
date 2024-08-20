import React, { useState } from 'react';
import { images } from '../../../../utils/images';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const CyberCampusMain = () => {
  const [trackItemIn, setTrackItemIn] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);

  const handleTrackClick = (subtitle) => {
    setTrackItemIn(prev => !prev);
    setSelectedSubtitle(subtitle);
  };

  const trackData = [
    {
      title: '프론트엔드',
      subtitle: 'FRONT-END',
      bgColor: 'bg-gradient-to-r from-[#FFE3CF] to-[#FF8C3A]',
      navigateTo: 'front-end',
    },
    {
      title: '백엔드',
      subtitle: 'BACK-END',
      bgColor: 'bg-gradient-to-r from-[#BDFFFF] to-[#47EAEA]',
      navigateTo: 'back-end',
    },
    {
      title: '기획/디자인',
      subtitle: 'PM/DESIGN',
      bgColor: 'bg-gradient-to-r from-[#FFD1E2] to-[#FF87B1]',
      navigateTo: 'pmDesign',
    },
  ];

  return (
    <div className='flex flex-col mx-auto container text-center'>
      {/* title */}
      <div className="flex flex-col items-center justify-center pt-40 fontEB">
        <div className="text-[#3B79FF] my-2 ml-1 text-7xl">LIKELION SKU</div>
        <div className="mr-1 text-6xl">사이버캠퍼스</div>
      </div>

      {/* subTitle */}
      <div className='py-12'>성결대학교 아기사자들을 위한 학습 공간입니다.</div>

      {/* Track Box */}
      {!trackItemIn && 
      <div className="container mx-auto xl:w-full xl:px-0">
        <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-3">
          {trackData.map((track, index) => (
          <TrackItem
              key={index}
              title={track.title}
              subtitle={track.subtitle}
              bgColor={track.bgColor}
              navigateTo={track.navigateTo}
              handleTrackClick={handleTrackClick}
          />
          ))}
        </div>
      </div>}

      {trackItemIn && <TrackItemIn title={selectedSubtitle} handleTrackClick={handleTrackClick} /> }
    </div>
  )
};

export default CyberCampusMain;

const TrackItem = ({ title, subtitle, bgColor, navigateTo, handleTrackClick}) => {
  return (
    <div className="p-4">
      <button
        onClick={() => handleTrackClick(subtitle)}
        className={`relative group flex flex-col justify-between mx-auto w-4/5 xl:w-full h-[14rem] text-black rounded-md ${bgColor} transition-colors duration-300`}>
        <div className="flex justify-between w-full h-full">
          <div className="pb-5 pl-8 text-start">
            <div>
              <p className="pt-16 text-4xl fontBold mb-1">{title}</p>
              <p className="text-xl">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-end justify-end h-full">
            <img src={images.arrowB} alt="arrow" className="h-[14%] mb-6 mr-5 z-10" />
          </div>
        </div>
      </button>
    </div>
  );
};

const TrackItemIn = ({ navigateTo, title, handleTrackClick }) => {
  const navigate = useNavigate();

  return (
    <div className='flex'>
    <button onClick={handleTrackClick}>
      <IoIosArrowBack size={40}/>
    </button>

    <div className="container mx-auto xl:w-full xl:px-0">
      <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-2">
        {/* 강의자료 */}
        <div className="p-4">
        <button
          id={title}
          onClick={() => navigate(`/cyberCampus/intro/${title}/lecture`)}
          className={`mx-auto relative group flex flex-col justify-between w-4/5 xl:w- h-[14rem] text-black rounded-md transition-colors duration-300 bg-[#3B79FF]`}>
          <div className="flex justify-between w-full h-full">
            <div className="pb-5 pl-8 text-start text-white">
              <div>
                <p className="pt-16 text-4xl fontBold mb-1">강의자료</p>
              </div>
            </div>
            <div className="flex items-end justify-end h-full">
              <img src={images.doubleArrow} alt="arrow" className="h-[14%] mb-6 mr-5 z-10" />
            </div>
          </div>
        </button>
      </div>

      {/* 과제제출 */}
      <div className="p-4">
        <button
          id={title}
          onClick={() => navigate(`/cyberCampus/intro/${title}/assignment`)}
          className={`mx-auto relative group flex flex-col justify-between w-4/5 xl:w-4/5 h-[14rem] text-black rounded-md transition-colors duration-300 bg-[#FF7816]`}>
          <div className="flex justify-between w-full h-full">
            <div className="pb-5 pl-8 text-start text-white">
              <div>
                <p className="pt-16 text-4xl fontBold mb-1">과제제출</p>
              </div>
            </div>
            <div className="flex items-end justify-end h-full">
              <img src={images.doubleArrow} alt="arrow" className="h-[14%] mb-6 mr-5 z-10" />
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
  </div>
  );
};