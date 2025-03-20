import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { images } from '../../../../utils/images';

const IntroTrack = () => {
  const { track } = useParams();
  const navigate = useNavigate();

  const trackData = [
    {
      title: '강의자료 📚',
      subtitle: 'FRONT-END',
      bgColor: '#3B79FF',
      navigateTo: `/cyberCampus/intro/${track}/lecture`,
    },
    {
      title: '과제제출 🏷️',
      subtitle: 'BACK-END',
      bgColor: '#FF7816',
      navigateTo: `/cyberCampus/intro/${track}/assignment`,
    },
  ];

  return (
    <div className="container flex flex-col mx-auto text-center lg:min-h-screen lg:mb-32 sm:min-h-[calc(100vh-260px)]">
      {/* title */}
      <div className="flex flex-col items-center justify-center pt-40 fontEB">
        <div className="text-[#3B79FF] my-2 ml-1 text-7xl">LIKELION SKU</div>
        <div className="mr-1 text-6xl">사이버캠퍼스</div>
      </div>

      {/* subTitle */}
      <div className="my-20">성결대학교 아기사자들을 위한 학습 공간입니다.</div>

      <div className="flex justify-center w-10/12 mx-auto text-[28px] fontBold flex-wrap">
        {trackData.map((track, index) => (
          <button
            key={index}
            style={{ backgroundColor: track.bgColor }}
            className={`mb-20 text-white mx-8 w-[400px] shadow-lg pt-12 px-12 rounded-xl hover:textShadow duration-500 hover:translate-y-[-5px] text-start lg:py-8 lg:px-9 lg:w-[300px]`}
            onClick={() => {
              navigate(track.navigateTo);
            }}>
            <div className="flex flex-col justify-between h-full">
              <div className="mb-2 text-4xl lg:text-[28px]">{track.title}</div>
              <div className="py-8 text-end lg:pt-8 lg:py-0">
                <img src={images.doubleArrow} alt="arrow" className="inline w-8 lg:w-6" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntroTrack;
