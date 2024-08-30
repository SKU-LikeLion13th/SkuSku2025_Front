import React, { useState, useEffect } from 'react';
import CyberCampusLocation from '../../../../../components/CyberCampusLocation';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import API from '../../../../../utils/axios';

export default function TodaysDetail() {
  const { track, assignmentId } = useParams();
  const { state } = useLocation();
  const { title, subTitle, description } = state || {};
  const [file, setFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignmentDetail = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }

      try {
        const response = await API.get('/submit/status', {
          params: {
            writer: localStorage.getItem('name') || 'Unknown', // 로컬 스토리지에서 이름을 가져옴
            track: track,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const assignment = response.data.ing.find(a => a.assignmentId === parseInt(assignmentId));
        if (assignment) {
          setSubmitStatus(assignment.submitAssignmentWithoutDTO?.submitStatus || '제출 안 함');
        }
      } catch (error) {
        console.error('과제 세부 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchAssignmentDetail();
  }, [assignmentId, track]);

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
    formData.append('assignmentId', assignmentId);
    formData.append('files', file);

    try {
      const response = await API.post('/submit/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmitStatus('제출 완료');
      console.log('서버 응답:', response.data);
      alert('제출이 완료되었습니다!');

      navigate(`/cyberCampus/intro/${track}/assignment/progressingAssignment`);
    } catch (error) {
      setSubmitStatus('제출 안 함');
      console.error('과제 제출 중 오류 발생:', error);
      alert('과제 제출 중 오류 발생');
    }
  };

  return (
    <div className="relative min-h-screen mx-auto text-black">
      <div className="flex flex-col items-center justify-center pt-24 text-6xl fontEB">
        <div className="text-[#3B79FF] my-2 mx-2 text-7xl">{track}</div>
        <div>과제 제출</div>
      </div>
      <CyberCampusLocation />
      <div className="w-3/5 mx-auto">
        <div className="pb-6 mt-12 mb-6 text-2xl border-b-2 border-black fontBold">
          {title}[{subTitle}]
        </div>
        <div className="mb-6 text-sm">{description}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 text-xl fontBold whitespace-nowrap">제출 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-3 py-1">{submitStatus || '제출 안 함'}</div>
          </div>
          <div className="flex items-center w-1/2">
            <label className="mr-3 text-xl fontBold whitespace-nowrap" htmlFor="file">
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
        <div className="flex justify-end mt-16">
          <input
            type="submit"
            value="과제 제출"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
