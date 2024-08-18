import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignmentTitle from '../../../components/AssignmentTitle';
import TodayTaskManagement from './TodayTaskManagement';
import OngoingTaskManagement from './OngoingTaskManagement';

const AssignmentDetail = ({ assignment }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOngoingTask, setIsOngoingTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        let token = localStorage.getItem('token');
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }

        const response = await axios.get('https://back.sku-sku.com/admin/submit/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            track: 'FRONTEND',
            writer: assignment.name,
          },
        });

        const { assignments } = response.data;

        const todayTasks =
          assignments?.today?.map(task => ({
            id: task.id,
            title: task.title,
            subTitle: task.subTitle,
            submitted: task.submitAssignmentAllDTO?.submitStatus === 'SUBMITTED',
            fileAttached: task.submitAssignmentAllDTO?.files.length > 0,
            files: task.submitAssignmentAllDTO?.files || [], // 파일 배열 설정
            passNonePass: task.submitAssignmentAllDTO?.passNonePass || '', // 통과 여부
          })) || [];

        const ongoingTasks =
          assignments?.ing?.map(task => ({
            id: task.id,
            title: task.title,
            subTitle: task.subTitle,
            submitted: task.submitAssignmentAllDTO?.submitStatus === 'SUBMITTED',
            fileAttached: task.submitAssignmentAllDTO?.files.length > 0,
            files: task.submitAssignmentAllDTO?.files || [], // 파일 배열 설정
            passNonePass: task.submitAssignmentAllDTO?.passNonePass || '', // 통과 여부
          })) || [];

        setTasks(todayTasks);
        setOngoingTasks(ongoingTasks);
      } catch (error) {
        console.error('Error fetching assignment details:', error);
      }
    };

    fetchAssignmentDetails();
  }, [assignment.name]);

  const downloadBase64File = (base64Data, fileName, fileType) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileType });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // 다운로드할 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 다운로드 후 링크 제거
  };

  return selectedTask ? (
    isOngoingTask ? (
      <OngoingTaskManagement
        assignmentId={selectedTask.id} // assignmentId 전달
        writer={assignment.name} // writer 전달
        task={selectedTask} // 선택된 task 정보 전달
      />
    ) : (
      <TodayTaskManagement
        assignmentId={selectedTask.id} // assignmentId 전달
        writer={assignment.name} // writer 전달
        task={selectedTask} // 선택된 task 정보 전달
      />
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
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">통과 여부</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">첨부파일</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">관리</th>
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
                  {task.submitted && (
                    <span className={` ${task.passNonePass === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                      {task.passNonePass === 'PASS' ? '통과' : '통과되지 않음'}
                    </span>
                  )}
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
                <td className="px-4 py-2 text-sm fontBold">
                  {task.submitted && (
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsOngoingTask(false); // 오늘의 과제 관리로 이동
                      }}>
                      관리
                    </button>
                  )}
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
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">통과 여부</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">첨부파일</th>
              <th className="px-4 py-2 fontBold text-sm bg-[#f7f7f7]">관리</th>
            </tr>
          </thead>
          <tbody>
            {ongoingTasks.map(task => (
              <tr key={task.id} className="text-center border-b border-gray-300">
                <td className="px-4 py-2 text-sm">{task.title}</td>
                <td className={`px-4 py-2 text-sm  ${task.submitted ? 'text-blue-600' : 'text-red-600'}`}>
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
