import React from 'react';
import MainSlider from './slider/MainSlider';
import { images } from '../../utils/images';

const Main1 = () => {
  return (
    <div id="main1" className="main1 w-full mb-0 pb-0 min-h-screen snap-section">
      <div className="flex flex-col justify-between text-white z-10 min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="title text-[6rem] md:text-[8rem] leading-none fontBold pb-5">
            <p className="mb-4 text-[#3B79FF]">SKU</p>
            <p className="">LIKELION 12th</p>
          </div>
        </div>
        <div className="flex items-end justify-center">
          <img src={images.mouse} alt="마우스 모양" className="mr-3" />
          <p className="fontSB text-xl text-[#666666] ml-3 flex items-center">Scroll down</p>
        </div>
      </div>
      <MainSlider />
    </div>
  );
};

export default Main1;
