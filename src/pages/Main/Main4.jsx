import React from 'react';
import Trackbtn from './Trackbtn';

const Main4 = () => {
  return (
    <div className="main4 relative w-full my-20 mb-48">
      <div className="flex flex-col justify-center items-center mx-16">
        <p className="text-7xl fontBold text-[#3B79FF]">TRACKS</p>
        <p className="text-lg fontLight my-12">멋쟁이사자처럼에서 각 트랙별로 세분화된 교육과 경험을 제공합니다.</p>
        <Trackbtn />
      </div>
    </div>
  );
};

export default Main4;
