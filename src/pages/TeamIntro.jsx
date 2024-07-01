import React, { useState } from 'react';
import Person from '../components/Person';

const TeamIntro = () => {
  const [activeTab, setActiveTab] = useState('tab12');

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const id12gi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 12기
  const id11gi = [12, 13, 14, 2, 11, 5, 6]; // 11기

  const tabClass = tab =>
    `cursor-pointer text-xl fontBold relative ${
      activeTab === tab
        ? 'text-white after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-white'
        : 'text-gray-500'
    }`;

  return (
    <>
      <div className="mt-10 text-center">
        <div className="text-[#3A78FF] text-5xl fontEB">
          SKU LIKELION
          <br />
        </div>
        <div className="text-[#FFFFFF] text-5xl fontEB mt-4">운영진</div>
      </div>

      <div className="flex justify-center mt-10 p-10 space-x-20">
        <div className={tabClass('tab12')} onClick={() => handleTabClick('tab12')}>
          12기
        </div>
        <div className={tabClass('tab11')} onClick={() => handleTabClick('tab11')}>
          11기
        </div>
      </div>

      {activeTab === 'tab12' && <Person idList={id12gi} />}
      {activeTab === 'tab11' && <Person idList={id11gi} />}
    </>
  );
};

export default TeamIntro;
