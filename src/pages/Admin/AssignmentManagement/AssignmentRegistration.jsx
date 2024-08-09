import React from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';

const AssignmentRegistration = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <AssignmentTitle variant="title">FRONT-END</AssignmentTitle>
      <AssignmentTitle variant="subtitle">과제 제출 관리</AssignmentTitle>
      <div className="flex space-x-8">
        <div className="p-6 bg-blue-200 rounded-lg shadow-lg w-64 text-center">
          <div className="text-2xl fontBold mb-4 text-[#323232]">오늘의 과제 관리</div>
          <p className="text-lg text-[#323232] fontLight">신규과제를 등록해주세요</p>
        </div>
        <div className="p-6 bg-orange-200 rounded-lg shadow-lg w-64 text-center">
          <div className="text-2xl fontBold mb-4 text-[#323232] ">진행중인 과제 관리</div>
          <p className="text-lg text-[#323232] fontLight">
            아기사자들의 과제를 확인해주세요 미통과 처리 시 피드백을 남겨주세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentRegistration;
