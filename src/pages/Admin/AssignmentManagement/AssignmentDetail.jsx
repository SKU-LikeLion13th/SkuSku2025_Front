import React, { useState, useEffect } from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';
import TodayTaskManagement from './TodayTaskManagement';
import OngoingTaskManagement from './OngoingTaskManagement';
import API from '../../../utils/axios';

const AssignmentDetail = ({ assignment, trackType }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOngoingTask, setIsOngoingTask] = useState(false);
  const [tasks, setTasks] = useState([]); // 오늘의 과제 리스트
  const [ongoingTasks, setOngoingTasks] = useState([]); // 진행 중인 과제 리스트

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        let token = localStorage.getItem('token');
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }

        const response = await 
        API.get('/admin/submit/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            track: trackType.toUpperCase(),
            writer: assignment.name,
          },
        });

        const todayTasks = response.data.today.map(task => ({
          id: task.assignmentId,
          title: task.title,
          subTitle: task.subTitle,
          dueDate: task.dueDate || '미정', // 마감일이 없으면 "미정"으로 표시
          submitted: task.submitAssignmentWithoutDTO?.submitStatus === 'SUBMITTED',
          fileAttached: task.submitAssignmentWithoutDTO?.files?.length > 0,
          files: task.submitAssignmentWithoutDTO?.files || [],
          passNonePass: task.submitAssignmentWithoutDTO?.passNonePass || '',
        }));

        const ongoingTasks = response.data.ing.map(task => ({
          id: task.assignmentId,
          title: task.title,
          subTitle: task.subTitle,
          dueDate: task.dueDate || '미정', // 마감일이 없으면 "미정"으로 표시
          submitted: task.submitAssignmentWithoutDTO?.submitStatus === 'SUBMITTED',
          fileAttached: task.submitAssignmentWithoutDTO?.files?.length > 0,
          files: task.submitAssignmentWithoutDTO?.files || [],
          passNonePass: task.submitAssignmentWithoutDTO?.passNonePass || '',
          feedback: task.submitAssignmentWithoutDTO?.responseFeedback?.content || '',
        }));

        setTasks(todayTasks);
        setOngoingTasks(ongoingTasks);
      } catch (error) {
        console.error('Error fetching assignment details:', error);
      }
    };

    fetchAssignmentDetails();
  }, [assignment.name, trackType]);

  const downloadBase64File = (base64Data, fileName, fileType) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return selectedTask ? (
    isOngoingTask ? (
      <OngoingTaskManagement assignmentId={selectedTask.id} writer={assignment.name} task={selectedTask} />
    ) : (
      <TodayTaskManagement assignmentId={selectedTask.id} writer={assignment.name} task={selectedTask} />
    )
  ) : (
    <>
      <div className="flex flex-col items-center mb-10 mt-12">
        <AssignmentTitle variant="title" className="mb-8">
          {trackType.replace('_', ' ')}
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
              <td className={`px-4 py-2 text-sm ${tasks.length === 0 ? 'text-red-600' : 'text-blue-600'}`}>
                {tasks.length}
              </td>
              <td className={`px-4 py-2 text-sm ${ongoingTasks.length === 0 ? 'text-red-600' : 'text-blue-600'}`}>
                {ongoingTasks.length}
              </td>
              <td className="px-4 py-2 text-sm">{assignment.passCount}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-xl fontBold mb-4">오늘의 과제 관리 ({tasks.length})</div>
        <table className="min-w-full bg-white border-t border-[black] mb-20">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">과제 제목</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">제출 여부</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">첨부파일</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">마감일</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="text-center border-b border-gray-300">
                <td className="px-4 py-2 text-sm">{task.title}</td>
                <td className={`px-4 py-2 text-sm ${task.submitted ? 'text-blue-600' : 'text-red-600'}`}>
                  {task.submitted ? '제출' : '미제출'}
                </td>
                <td className="px-4 py-2 text-sm">
                  {task.fileAttached
                    ? task.files.map(file => (
                        <button
                          key={file.id}
                          onClick={() => downloadBase64File(file.file, file.fileName, file.fileType)}
                          className="text-blue-500 underline">
                          다운로드
                        </button>
                      ))
                    : '없음'}
                </td>
                <td className="px-4 py-2 text-sm fontBold">{task.dueDate}</td> {/* 마감일 렌더링 */}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-xl fontBold mb-4">진행중인 과제 관리 ({ongoingTasks.length})</div>
        <table className="min-w-full bg-white border-t border-[black]">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">과제 제목</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">제출 여부</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">통과 여부</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">첨부파일</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">관리</th>
            </tr>
          </thead>
          <tbody>
            {ongoingTasks.map(task => (
              <tr key={task.id} className="text-center border-b border-gray-300">
                <td className="px-4 py-2 text-sm">{task.title}</td>
                <td className={`px-4 py-2 text-sm ${task.submitted ? 'text-blue-600' : 'text-red-600'}`}>
                  {task.submitted ? '제출' : '미제출'}
                </td>
                <td className="px-4 py-2 text-sm">
                  {task.submitted && (
                    <span className={`${task.passNonePass === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                      {task.passNonePass === 'PASS' ? '통과' : '통과되지 않음'}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm">
                  {task.fileAttached
                    ? task.files?.map(file => (
                        <button
                          key={file.id}
                          onClick={() => downloadBase64File(file.file, file.fileName, file.fileType)}
                          className="text-blue-500 underline">
                          다운로드
                        </button>
                      ))
                    : '없음'}
                </td>
                <td className="px-4 py-2 text-sm fontBold">
                  {task.submitted && (
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsOngoingTask(true); // 진행 중인 과제 관리로 이동
                      }}>
                      관리
                    </button>
                  )}
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
