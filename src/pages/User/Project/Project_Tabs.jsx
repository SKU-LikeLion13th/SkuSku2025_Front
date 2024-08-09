// Project_Tabs.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const tabs = [
  { name: '전체', value: 'all' },
  { name: '12기', value: '12' },
  { name: '11기', value: '11' },
];

const Project_Tabs = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState('all');
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleTabClick = tabValue => {
    setActiveTab(tabValue);
    onTabClick(tabValue);
  };

  return (
    <>
      <div className={`mt-6 text-center md:text-start ${isAdminPage ? 'text-black' : 'text-white'}`}>
        {tabs.map(tab => {
          // Define styles based on `isAdminPage` and `activeTab`
          const baseStyle = 'py-2 px-2 mr-3 text-xl border-b-[3px]';
          const activeStyle = isAdminPage ? 'fontBold border-b-black' : 'fontBold border-b-white';
          const inactiveStyle = isAdminPage ? 'border-b-white' : 'border-b-black';

          return (
            <button
              key={`${tab.value}th`}
              className={`${baseStyle} ${activeTab === tab.value ? activeStyle : inactiveStyle}`}
              onClick={() => handleTabClick(tab.value)}>
              {tab.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Project_Tabs;
