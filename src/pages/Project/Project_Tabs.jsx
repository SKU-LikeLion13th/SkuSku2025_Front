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
    <div className="mt-6 text-white max-[500px]:mt-2">
      <div className="flex justify-between w-1/6">
        {tabs.map(tab => (
          <button
            key={`${tab.value}th`}
            className={`py-2 px-1 text-xl max-[500px]:text-sm ${
              activeTab === tab.value ? 'border-b-[3px] border-white fontEB' : ''
            }`}
            onClick={() => handleTabClick(tab.value)}>
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Project_Tabs;
