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
      navigateTo: `/cyberCampus/intro/${track}/lecture`
    },
    {
      title: '과제제출 🏷️',
      subtitle: 'BACK-END',
      bgColor: '#FF7816',
      navigateTo: `/cyberCampus/intro/${track}/assignment`
    }
  ];

  return (
    <div className='flex flex-col mx-auto container text-center'>
      {/* title */}
      <div className="flex flex-col items-center justify-center pt-40 fontEB">
        <div className="text-[#3B79FF] my-2 ml-1 text-7xl">LIKELION SKU</div>
        <div className="mr-1 text-6xl">사이버캠퍼스</div>
      </div>

      {/* subTitle */}
      <div className='my-16'>성결대학교 아기사자들을 위한 학습 공간입니다.</div>

      <div className="flex justify-center w-10/12 mx-auto text-[28px] fontBold flex-wrap">
        {trackData.map((track, index) => (
          <button
            key={index}
            style={{ backgroundColor: track.bgColor }}
            className={`mb-24 text-white mb-10 mx-8 w-[300px] shadow-lg h-[180px] px-8 rounded-xl hover:textShadow duration-500 hover:translate-y-[-5px] text-start`}
            onClick={() => {navigate(track.navigateTo); console.log(track.navigateTo, index)}}>
            <div className='flex flex-col justify-between h-full py-10'>
              <div className="mb-2">{track.title}</div>
              <div className='text-end'><img src={images.doubleArrow} alt="arrow" className='inline'/></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


export default IntroTrack;