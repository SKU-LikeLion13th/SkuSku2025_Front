import React from 'react';
import MainSlider from './slider/MainSlider';
import { images } from '../../../utils/images';

const Main1 = () => {
  return (
    <div id="main1" className="w-full min-h-screen pb-0 mb-0 main1 snap-section">
      <div className="z-10 flex flex-col justify-between min-h-screen text-white">
        <div className="flex items-center justify-center flex-grow">
          <div className="title text-[6rem] xl:text-[8rem] leading-none fontBold pb-5">
            <p className="mb-4 text-[#3B79FF]">SKU</p>
            <p className="">LIKELION 12th</p>
          </div>
        </div>
        <div className="flex items-end justify-center pb-5">
          <img src={images.mouse} alt="마우스 모양" className="mr-3" />
          <p className="fontSB text-xl text-[#666666] ml-3 flex items-center">Scroll down</p>
        </div>
      </div>
      <MainSlider />
    </div>
  );
};

export default Main1;
