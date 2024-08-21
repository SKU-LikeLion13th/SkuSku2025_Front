import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CyberCampusLocation from '../../../../../components/CyberCampusLocation';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProgressingDetails() {
  const { track, assignmentId } = useParams();
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [file, setFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('');
  const [passStatus, setPassStatus] = useState('통과 안됨');
  const [feedback, setFeedback] = useState('피드백이 없습니다.');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const writer = localStorage.getItem('name') || 'Unknown';
      if (!token) {
        console.error('토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }
      const normalizedTrack = track.replace('-', '');

      try {
        const response = await axios.get('https://back.sku-sku.com/submit/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            writer: writer,
            track: normalizedTrack,
          },
        });

        const assignments = response.data.ing || [];
        const assignment = assignments.find(item => item.assignmentId === parseInt(assignmentId, 10));

        if (assignment) {
          setAssignmentDetails(assignment);
          const submitDetails = assignment.submitAssignmentWithoutDTO;
          if (submitDetails) {
            setSubmitStatus(submitDetails.submitStatus === 'SUBMITTED' ? '제출 완료' : '제출 안 함');
            setPassStatus(submitDetails.passNonePass === 'PASS' ? '통과' : '통과 안됨');
            setFeedback(submitDetails.responseFeedback ? submitDetails.responseFeedback.content : '피드백이 없습니다.');
          }
        } else {
          setSubmitStatus('제출 안 함');
          setPassStatus('통과 안됨');
          setFeedback('피드백이 없습니다.');
        }
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
    formData.append('assignmentId', assignmentId);
    formData.append('files', file);

    try {
      const response = await axios.post('https://back.sku-sku.com/submit/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // 제출 성공 후 상태 업데이트
      setSubmitStatus('제출 완료');

      // 서버에서 과제 상태를 재조회하여 업데이트
      const updatedResponse = await axios.get('https://back.sku-sku.com/submit/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          writer: localStorage.getItem('name') || 'Unknown',
          track: track.replace('-', ''),
        },
      });

      const updatedAssignments = updatedResponse.data.ing || [];
      const updatedAssignment = updatedAssignments.find(item => item.assignmentId === parseInt(assignmentId, 10));

      if (updatedAssignment) {
        const submitDetails = updatedAssignment.submitAssignmentWithoutDTO;
        if (submitDetails) {
          setPassStatus(submitDetails.passNonePass === 'PASS' ? '통과' : '통과 안됨');
          if (submitDetails.submitStatus === 'SUBMITTED' && submitDetails.passNonePass === 'PASS') {
            // 과제가 완료된 것으로 간주하고 이동
            navigate(`/cyberCampus/intro/${track}/assignment/completedAssignment`);
            return;
          }
        }
      }

      alert('과제가 성공적으로 제출되었습니다!');
      navigate(`/cyberCampus/intro/${track}/assignment/progressingAssignment`);
    } catch (error) {
      setSubmitStatus('제출 실패');
      console.error('과제 제출 중 오류 발생:', error.response || error.message || error);
      alert('과제 제출 중 오류 발생.');
    }
  };

  const submitStatusStyle = submitStatus === '제출 완료' ? { color: 'green' } : { color: 'red' };
  const passStatusStyle = passStatus === '통과' ? { color: 'green' } : { color: 'red' };

  return (
    <div className="relative min-h-screen mx-auto text-black">
      <div className="flex flex-col items-center justify-center pt-24 text-6xl fontEB">
        <div className="text-[#3B79FF] my-2 mx-2 text-7xl">{track}</div>
        <div>과제 제출</div>
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
            <div className="border-[1px] bg-inherit rounded-md px-3 py-1" style={submitStatusStyle}>
              {submitStatus}
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 text-xl fontBold w-[80px]">통과 여부</div>
            <div className="border-[1px] bg-inherit rounded-md px-3 py-1" style={passStatusStyle}>
              {passStatus}
            </div>
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
          <div className="text-xs">{feedback}</div>
        </div>
        <div className="flex justify-end mt-16">
          <input
            type="submit"
            value="과제 제출"
            className="px-6 py-2 text-white bg-[#FF7816] rounded-lg cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
