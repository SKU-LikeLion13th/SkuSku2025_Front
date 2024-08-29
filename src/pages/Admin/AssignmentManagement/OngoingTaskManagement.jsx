import React, { useState, useEffect } from 'react';
import AssignmentTitle from '../../../components/AssignmentTitle';
import Breadcrumb from '../../../components/Breadcrumb';
import API from '../../../utils/axios';

const OngoingTaskManagement = ({ assignmentId, writer, task }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [passStatus, setPassStatus] = useState(''); // 통과 여부 상태 추가
  const [feedBackId, setFeedBackId] = useState(null); // feedBackId 상태 추가

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        let token = localStorage.getItem('token');
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }

        const response = await API.get('/admin/submit/assignment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            assignmentId,
            writer,
          },
        });
        console.log('API Response:', response.data);
        setTaskDetails(response.data);

        // 기본 피드백과 통과 여부 상태 설정
        if (response.data.assignSubmitFeed) {
          const feedback = response.data.assignSubmitFeed.feedbacks;
          setFeedbackContent(feedback?.content || '');
          setFeedBackId(feedback?.feedBackId || null); // feedBackId 설정
          setPassStatus(response.data.assignSubmitFeed.passNonePass || 'FAIL');
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [assignmentId, writer]);

  if (!taskDetails) {
    return <div>Loading...</div>;
  }

  const { title, assignSubmitFeed, dueDate } = taskDetails; // dueDate 추가
  const { submitStatus, files = [] } = assignSubmitFeed || {};

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

  const handleSubmit = async () => {
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }

      const payload = {
        submitAssignmentId: assignSubmitFeed.id, // 과제 ID
        content: feedbackContent, // 작성된 피드백 내용
        passNonePass: passStatus, // 선택된 통과 여부
      };

      await API.post('/admin/feedback/add', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('피드백이 성공적으로 등록되었습니다.');
      // 여기서 navigate를 사용하지 않으므로 페이지가 유지됩니다.
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('피드백 등록 중 오류가 발생했습니다.');
    }
  };

  const handleUpdate = async () => {
    try {
      let token = localStorage.getItem('token');
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }

      const payload = {
        feedBackId, // 피드백 ID
        content: feedbackContent, // 수정된 피드백 내용
        passNonePass: passStatus, // 통과 여부 값 추가
      };

      await API.put('/admin/feedback/update', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('피드백이 성공적으로 수정되었습니다.');
      // 여기서도 navigate를 사용하지 않으므로 페이지가 유지됩니다.
    } catch (error) {
      console.error('Error updating feedback:', error);
      alert('피드백 수정 중 오류가 발생했습니다.');
    }
  };

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
      <div className="flex justify-between items-center mb-4 text-2xl fontBold">
        <div>{title}</div>
        <div className="text-lg fontBold">마감일 : {dueDate || '미정'}</div> {/* 마감일 렌더링 */}
      </div>

      <div className="border-t border-[black] mb-8"></div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="fontBold text-lg mr-4">제출 여부</div>
          <div className="px-4 py-2 border rounded-md text-sm border-gray-400">
            {submitStatus === 'SUBMITTED' ? '제출 완료' : '미제출'}
          </div>
        </div>

        <div className="flex items-center ml-8">
          <div className="fontBold text-lg mr-4">통과 여부</div>
          <select
            value={passStatus}
            onChange={e => setPassStatus(e.target.value)}
            className={`px-4 py-2 border rounded-md text-sm border-gray-400 ${
              passStatus === 'PASS' ? 'text-green-500' : 'text-red-500'
            }`}>
            <option value="PASS" className="text-green-500">
              통과
            </option>
            <option value="FAIL" className="text-red-500">
              통과되지 않음
            </option>
          </select>
        </div>

        <div className="flex items-center ml-8">
          <div className="fontBold text-lg mr-4">과제 업로드</div>
          {files.length > 0 ? (
            <button
              onClick={() => downloadBase64File(files[0].file, files[0].fileName, files[0].fileType)}
              className="text-blue-600 px-6 py-2 text-sm border border-gray-400 rounded-md w-60">
              {files[0].fileName}
            </button>
          ) : (
            <div className="text-sm border border-gray-400 rounded-md px-6 py-2">파일 없음</div>
          )}
        </div>
      </div>

      <div className="flex items-center mb-4">
        <span className="text-lg fontBold mr-4">피드백</span>
        <textarea
          className="border border-gray-300 flex-grow h-24 p-4 text-sm text-gray-600"
          placeholder="피드백을 작성해 주세요"
          value={feedbackContent}
          onChange={e => setFeedbackContent(e.target.value)}></textarea>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-[#3a78ff] text-white text-base fontMedium rounded-md hover:bg-blue-700">
          등록
        </button>
        {feedBackId && (
          <button
            onClick={handleUpdate}
            className="ml-4 px-8 py-2 bg-yellow-500 text-white fontMedium text-base rounded-md hover:bg-yellow-600">
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default OngoingTaskManagement;
