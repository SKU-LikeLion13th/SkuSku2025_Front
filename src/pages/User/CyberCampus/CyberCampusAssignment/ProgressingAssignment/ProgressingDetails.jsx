import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CyberCampusLocation from '../../../../../components/CyberCampusLocation';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProgressingDetails() {
  const { track, assignmentId } = useParams(); // URL에서 track과 assignmentId를 추출
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [file, setFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('');
  const navigate = useNavigate(); // navigate 훅 사용

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }
      const normalizedTrack = track.replace('-', '');

      try {
        const response = await axios.get('https://back.sku-sku.com/assignment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            track: normalizedTrack,
            status: 'ING', // 필요한 상태로 조정 가능
          },
        });

        // 응답 데이터에서 assignmentId와 일치하는 과제를 찾습니다.
        const assignments = response.data.assignments || [];
        const assignment = assignments.find(item => item.id === parseInt(assignmentId, 10));
        setAssignmentDetails(assignment || {});
        console.log('과제 세부 정보:', assignment || {});
      } catch (error) {
        console.error('과제 세부 정보를 가져오는 중 오류 발생:', error.response || error.message || error);
      }
    };

    fetchAssignmentDetails();
  }, [track, assignmentId]);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('submitAssignmentId', assignmentId); // assignmentId를 폼 데이터에 추가
    formData.append('files', file);

    try {
      const response = await axios.put('https://back.sku-sku.com/submit/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmitStatus('수정 완료');
      console.log('서버 응답:', response.data);
      alert('과제가 성공적으로 수정되었습니다!');

      navigate(`/cyberCampus/intro/${track}/assignment/progressingAssignment`); // 성공 시 페이지 이동
    } catch (error) {
      setSubmitStatus('수정 실패');
      console.error('과제 수정 중 오류 발생:', error.response || error.message || error);
      alert('과제 수정 중 오류 발생.');
    }
  };

  return (
    <div className="relative min-h-screen mx-auto text-black">
      <div className="flex flex-col items-center justify-center pt-24 text-6xl fontEB">
        <div className="text-[#3B79FF] my-2 mx-2 text-7xl">{track}</div>
        <div>과제 수정</div>
      </div>
      <CyberCampusLocation />
      <div className="w-3/5 mx-auto">
        <div className="pb-6 mt-12 mb-6 text-2xl border-b-2 border-black fontBold">
          {assignmentDetails.title}[{assignmentDetails.subTitle}]
        </div>
        <div className="mb-6 text-sm">{assignmentDetails.description}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 text-xl fontBold w-[80px]">제출 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-3 py-1">{submitStatus || '제출 안 함'}</div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 text-xl fontBold w-[80px]">통과 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-3 py-1">통과 안됨</div>
          </div>
          <div className="flex items-center w-1/2">
            <label className="mr-3 text-xl fontBold w-[120px]" htmlFor="file">
              과제 업로드
            </label>
            <input
              type="file"
              className="cursor-pointer bg-inherit border-[1px] border-[#7D7D7D] py-2 px-3 rounded-lg text-xs text-[#7D7D7D] fontRegular w-full"
              id="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex items-center mt-8">
          <div className="mr-4 text-xl fontBold w-[75px]">피드백</div>
          <div className="text-xs">{assignmentDetails.feedbacks || '피드백이 없습니다.'}</div>
        </div>
        <div className="flex justify-end mt-16">
          <input
            type="submit"
            value="과제 수정"
            className="px-6 py-2 text-white bg-[#FF7816] rounded-lg cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
