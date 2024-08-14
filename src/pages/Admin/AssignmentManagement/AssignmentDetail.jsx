import React, { useState } from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';
import TodayTaskManagement from './TodayTaskManagement';
import OngoingTaskManagement from './OngoingTaskManagement';

const AssignmentDetail = ({ assignment }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOngoingTask, setIsOngoingTask] = useState(false);

  return selectedTask ? (
    isOngoingTask ? (
      <OngoingTaskManagement task={selectedTask} />
    ) : (
      <TodayTaskManagement task={selectedTask} />
    )
  ) : (
    <>
      <div className="flex flex-col items-center mb-10 mt-12">
        <AssignmentTitle variant="title" className="mb-8">
          FRONT-END
        </AssignmentTitle>
        <AssignmentTitle variant="subtitle" className="mb-12">
          과제 제출 관리
        </AssignmentTitle>
      </div>

      <div className="mt-8">
        <div className="text-2xl fontBold mb-4">{assignment.name}</div>
        <table className="min-w-full bg-white border-t border-[black] mb-20">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">아기사자</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">오늘의 과제</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">진행중인 과제</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">통과된 과제</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center border-b border-gray-300">
              <td className="px-4 py-2 text-sm">{assignment.name}</td>
              <td
                className={`px-4 py-2 text-sm ${
                  assignment.todayTask.startsWith('0') ? 'text-red-600' : 'text-blue-600'
                }`}>
                {assignment.todayTask}
              </td>
              <td
                className={`px-4 py-2 text-sm ${
                  assignment.ongoingTask.startsWith('0') ? 'text-red-600' : 'text-blue-600'
                }`}>
                {assignment.ongoingTask}
              </td>
              <td className="px-4 py-2 text-sm">{assignment.completedTask}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-xl fontBold mb-4">오늘의 과제 관리 ({assignment.todayTask})</div>
        <table className="min-w-full bg-white border-t border-[black] mb-20">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">과제 제목</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">제출 여부</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">첨부파일</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">관리</th>
            </tr>
          </thead>
          <tbody>
            {assignment.tasks.map(task => (
              <tr key={task.id} className="text-center border-b border-gray-300">
                <td className="px-4 py-2 text-sm">{task.title}</td>
                <td className={`px-4 py-2 text-sm ${task.submitted ? 'text-blue-600' : 'text-red-600'}`}>
                  {task.submitted ? '제출' : '미제출'}
                </td>
                <td className="px-4 py-2 text-sm">{task.fileAttached ? '다운로드' : '없음'}</td>
                <td className="px-4 py-2 text-sm fontBold">
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsOngoingTask(false); // 오늘의 과제 관리로 이동
                    }}>
                    관리
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-xl fontBold mb-4">진행중인 과제 관리 ({assignment.ongoingTask})</div>
        <table className="min-w-full bg-white border-t border-[black]">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">과제 제목</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">제출 여부</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">첨부파일</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">관리</th>
            </tr>
          </thead>
          <tbody>
            {assignment.ongoingTasks.map(task => (
              <tr key={task.id} className="text-center border-b border-gray-300">
                <td className="px-4 py-2 text-sm">{task.title}</td>
                <td className={`px-4 py-2 text-sm ${task.submitted ? 'text-blue-600' : 'text-red-600'}`}>
                  {task.submitted ? '제출' : '미제출'}
                </td>
                <td className="px-4 py-2 text-sm">{task.fileAttached ? '다운로드' : '없음'}</td>
                <td className="px-4 py-2 text-sm fontBold">
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsOngoingTask(true); // 진행 중인 과제 관리로 이동
                    }}>
                    관리
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignmentDetail;
