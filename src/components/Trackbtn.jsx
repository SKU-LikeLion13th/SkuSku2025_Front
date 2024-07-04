import React from 'react';

const TrackItem = ({ title, subtitle, bgColor, hoverBgColor, hoverContent }) => (
  <div className="p-4">
    <button
      className={`relative group flex flex-col justify-between mx-auto w-full h-42 text-white rounded-md ${bgColor} transition-colors duration-300`}
      style={{ minHeight: '10.5rem' }} // Ensure consistent height
    >
      <div className="text-start pl-8 pb-5">
        <div className="group-hover:hidden">
          <p className="text-3xl fontEB pt-16">{title}</p>
          <p className="text-3xl fontEB">{subtitle}</p>
        </div>
        <div className="hidden group-hover:block absolute inset-0 p-8">
          {hoverContent}
        </div>
      </div>
      <div className="self-end text-xl pb-7 pr-4">&gt;</div>
    </button>
    <style jsx>{`
      .group:hover .group-hover\\:block {
        display: block;
      }
      .group:hover .group-hover\\:hidden {
        display: none;
      }
      .group:hover {
        background-color: var(--hover-bg-color);
      }
    `}</style>
  </div>
);

const Trackbtn = () => {
  const trackData = [
    {
      title: '프론트엔드',
      subtitle: 'FRONT-END',
      bgColor: 'bg-[#666666]',
      hoverBgColor: 'bg-[#FFA500]',
      hoverContent: (
        <>
          <p>프론트엔드</p>
          <p>FRONT-END</p>
          <p className="text-lg">웹사이트의 얼굴</p>
          <p className="text-lg">사용자가 시각적으로 볼 수 있는 영역을 담당합니다.</p>
        </>
      ),
    },
    {
      title: '백엔드',
      subtitle: 'BACK-END',
      bgColor: 'bg-[#666666]', 
      hoverBgColor: 'bg-[#00A1E4]', 
      hoverContent: (
        <>
          <p>백엔드</p>
          <p>BACK-END</p>
          <p className="text-lg">웹사이트의 첫 걸음</p>
          <p className="text-lg">프로젝트 총괄 및 웹/앱 서비스 화면 디자인 영역을 담당합니다.</p>
        </>
      ),
    },
    {
      title: '기획/디자인',
      subtitle: 'PM/DESIGN',
      bgColor: 'bg-[#666666]', 
      hoverBgColor: 'bg-[#E91E63]',
      hoverContent: (
        <>
          <p>기획/디자인</p>
          <p>PM/DESIGN</p>
          <p className="text-2xl">웹사이트의 두뇌</p>
          <p className="text-2xl">서버 및 데이터 처리 영역을 담당합니다.</p>
        </>
      ),
    },
  ];

  return (
    <div className='container mx-auto w-full'>
      <div className="grid grid-cols-3 gap-8 w-full mt-7">
        {trackData.map((track, index) => (
          <TrackItem
            key={index}
            title={track.title}
            subtitle={track.subtitle}
            bgColor={track.bgColor}
            hoverBgColor={track.hoverBgColor}
            hoverContent={track.hoverContent}
          />
        ))}
      </div>
    </div>
  );
};

export default Trackbtn;
