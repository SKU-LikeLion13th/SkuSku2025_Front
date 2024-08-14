import React from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';
import Breadcrumb from '../../../components/Breadcrumb';

const OngoingTaskManagement = ({ task }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="flex flex-col items-center mb-16">
        <AssignmentTitle variant="title" className="mb-8">
          FRONT-END
        </AssignmentTitle>
        <AssignmentTitle variant="subtitle" className="mb-8">
          과제 제출
        </AssignmentTitle>
        <Breadcrumb />
      </div>
      <div className="text-left mb-4 text-2xl fontBold">{task.title}</div>

      <div className="border-t border-[black] mb-8"></div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="fontBold text-lg mr-4">제출 여부</div>
          <div className="px-4 py-2 border rounded-md text-sm border-gray-400">
            {task.submitted ? '제출 완료' : '미제출'}
          </div>
        </div>

        <div className="flex items-center ml-8">
          <div className="fontBold text-lg mr-4">통과 여부</div>
          <div
            className={`px-4 py-2 border rounded-md border-gray-400 text-sm ${
              task.passed ? 'text-green-600' : 'text-red-600'
            }`}>
            {task.passed ? '통과' : '통과되지 않음'}
          </div>
        </div>

        <div className="flex items-center ml-8">
          <div className="fontBold text-lg mr-4">과제 업로드</div>
          <div href={task.fileUrl} className="text-blue-600 px-6 py-2 text-sm border border-gray-400 rounded-md w-60">
            발표.pdf
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-lg fontBold mr-4">피드백</span>
        <textarea
          className="border border-gray-300 flex-grow h-24 p-4 text-sm text-gray-600"
          placeholder="피드백을 작성해 주세요"
          defaultValue={task.feedback}></textarea>
      </div>

      <div className="flex justify-end">
        <button className="px-8 py-2 bg-[#3a78ff] text-white text-base rounded-md hover:bg-blue-700">등록</button>
      </div>
    </div>
  );
};

export default OngoingTaskManagement;
