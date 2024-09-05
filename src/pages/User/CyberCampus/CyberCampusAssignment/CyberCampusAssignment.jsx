import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CyberCampusAssignment() {
  const navigate = useNavigate();
  const { track } = useParams();

  // 버튼 배열
  const buttons = [
    {
      title: '오늘의 과제',
      subTitle: '새로운 과제를 확인해보세요.',
      color: '#BACFFF',
      route: `/cyberCampus/intro/${track}/assignment/todaysAssignment`, // track 파라미터를 사용하여 경로 설정
    },
    {
      title: '진행중인 과제',
      subTitle: '과제가 통과되었는지 확인해보세요.\n운영진의 피드백이 있을 수 있어요.', // 줄 바꿈 추가
      color: '#FCBD8F',
      route: `/cyberCampus/intro/${track}/assignment/progressingAssignment`, // track 파라미터를 사용하여 경로 설정
    },
    {
      title: '완성된 과제',
      subTitle: '완성된 과제를 확인해보세요.',
      color: '#85E1AA',
      route: `/cyberCampus/intro/${track}/assignment/completedAssignment`, // track 파라미터를 사용하여 경로 설정
    },
  ];

  return (
    <div className="relative text-black mobileContainer lg:min-h-screen lg:mb-32">
      <div className="flex flex-col items-center justify-center pt-40 fontEB">
        <div className="text-[#3B79FF] my-2 ml-1 text-7xl">{track}</div>
        <div className="mr-1 text-6xl">과제제출</div>
      </div>
      <div className="flex flex-col justify-center w-10/12 gap-16 mx-auto mt-28 fontBold lg:flex-row lg:gap-8 lg:w-9/12">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="mx-auto w-[400px] py-16 px-12 shadow-lg rounded-xl duration-500 hover:translate-y-[-5px] text-start lg:py-14 lg:px-8 lg:w-[300px]"
            style={{ backgroundColor: button.color }}
            onClick={() => navigate(button.route)}>
            <div className="text-4xl lg:text-[28px] mb-4">{button.title}</div>
            <div className="text-base whitespace-pre-line fontRegular lg:whitespace-wrap">{button.subTitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
