// Project_Tabs.js
import React, { useState } from 'react';

const tabs = [
  { name: '전체', value: 'all' },
  { name: '12기', value: '12' },
  { name: '11기', value: '11' },
];

const Project_Tabs = ({ onTabClick }) => {
  const [activeTab, setActiveTab] = useState('all');

  const handleTabClick = tabValue => {
    setActiveTab(tabValue);
    onTabClick(tabValue);
  };

  return (
    <>
      <div className="mt-6 text-center text-white md:text-start">
        {tabs.map(tab => (
          <button
            key={`${tab.value}th`}
            className={`py-2 px-2 mr-3 text-xl ${
              activeTab === tab.value ? 'border-b-[3px] border-white fontEB' : 'border-b-[3px] border-b-black'
            }`}
            onClick={() => handleTabClick(tab.value)}>
            {tab.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Project_Tabs;
