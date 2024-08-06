import React, { useEffect, useState } from 'react';
import Person from '../components/Person';
import { useLocation } from 'react-router-dom';

const TeamIntro = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('tab12');

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const id12gi = [2, 6, 4, 3, 1, 5, 7, 8, 11, 9, 10]; // 12기
  const id11gi = [12, 13, 14, 16, 5, 15, 11]; // 11기

  const tabClass = tab =>
    `cursor-pointer text-xl fontBold relative ${
      activeTab === tab
        ? 'text-white after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-white'
        : 'text-gray-500'
    }`;

  useEffect(() => {
    const tab = location.search.replace('?', '');
    setActiveTab(tab);
  }, [location]);

  return (
    <>
      <div className="text-center mt-28">
        <div className="text-[#3A78FF] text-6xl fontEB">
          LIKELION SKU
          <br />
        </div>
        <div className="text-[#FFFFFF] text-6xl fontEB mt-4">운영진</div>
      </div>

      <div className="flex justify-center p-10 mt-10 space-x-20">
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
