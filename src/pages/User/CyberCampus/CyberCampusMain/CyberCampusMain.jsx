import React from 'react';
import { images } from '../../../../utils/images';
import { useNavigate } from 'react-router-dom';

const CyberCampusMain = () => {
  const trackData = [
    {
      title: '프론트엔드',
      subtitle: 'FRONT-END',
      bgColor: 'bg-gradient-to-r from-[#FFE3CF] to-[#FF8C3A]',
      navigateTo: '#',
    },
    {
      title: '백엔드',
      subtitle: 'BACK-END',
      bgColor: 'bg-gradient-to-r from-[#BDFFFF] to-[#47EAEA]',
      navigateTo: '#',
    },
    {
      title: '기획/디자인',
      subtitle: 'PM/DESIGN',
      bgColor: 'bg-gradient-to-r from-[#FFD1E2] to-[#FF87B1]',
      navigateTo: '#',
    },
  ];

  return (
    <div className='flex flex-col mx-auto container text-center'>
      {/* title */}
      <div className="text-center mt-12">
        <div className="text-[#3A78FF] text-6xl fontEB">
          LIKELION SKU
          <br />
        </div>
        <div className="text-[#FFFFFF] text-6xl fontEB mt-4">사이버캠퍼스</div>
      </div>

      {/* subTitle */}
      <div className='py-12'>성결대학교 아기사자들을 위한 학습 공간입니다.</div>

      {/* Track Box */}
      <div className="container mx-auto xl:w-full xl:px-0">
      <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-3 ">
        {trackData.map((track, index) => (
          <TrackItem
            key={index}
            title={track.title}
            subtitle={track.subtitle}
            bgColor={track.bgColor}
            navigateTo={track.navigateTo}
          />
        ))}
      </div>
    </div>
    </div>
  )
};

export default CyberCampusMain;


const TrackItem = ({ title, subtitle, bgColor, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(navigateTo)}
        className={`relative group flex flex-col justify-between mx-auto w-4/5 xl:w-full h-[14rem] text-black rounded-md ${bgColor} transition-colors duration-300`}>
        <div className="flex justify-between w-full h-full">
          <div className="pb-5 pl-8 text-start">
            <div>
              <p className="pt-16 text-4xl fontBold mb-1">{title}</p>
              <p className="text-xl">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-end justify-end h-full">
            {/* <img src={images.arrowM} alt="화살표" className="h-[14%] mb-6 mr-5 z-10" /> */}
            <img src={images.arrowB} alt="화살표" className="h-[14%] mb-6 mr-5 z-10" />
          </div>
        </div>
      </button>
    </div>
  );
};
