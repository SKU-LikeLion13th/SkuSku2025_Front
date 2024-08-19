import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateDetail = () => {
  const { id } = useParams();
  const [classTh, setClassTh] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const token = localStorage.getItem('authToken'); // 토큰 불러오기
      try {
        const response = await axios.get(`https://back.sku-sku.com/admin/project/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰 포함
          },
        });
        const project = response.data;
        setClassTh(project.classTh);
        setTitle(project.title);
        setSubTitle(project.subTitle);
        setUrl(project.url);
        if (project.image) {
          setImagePreview(`data:image/jpeg;base64,${project.image}`);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleFileUpload = event => {
    const file = event.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('classTh', classTh);
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('url', url);
    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('authToken'); // 토큰 불러오기

    try {
      const response = await axios.put('https://back.sku-sku.com/project/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // 토큰 포함
        },
      });
      alert('프로젝트 수정에 성공하였습니다!');
      window.location.href = '/admin/projectManagement/updateProject';
    } catch (error) {
      console.error('Error updating project:', error.response ? error.response.data : error.message);
      alert('프로젝트 수정에 실패하였습니다!');
    }
  };

  return (
    <div className="container min-h-screen mx-auto">
      <div className="w-10/12 mx-auto mt-28">
        <div className="pb-12 pr-20 text-6xl border-b-2 fontEB w-fit">
          <div className="text-[#3B79FF]">SKU LIKELION</div>
          <div className="text-black">PROJECT</div>
        </div>
        <form onSubmit={handleSubmit} className="px-24 mt-12 fontBold">
          <div className="mb-4 text-3xl fontBold">
            프로젝트 <span className="text-[#3b79ff]">수정</span>
          </div>
          <div className="flex items-center py-4">
            <label className="text-xl w-[60px] mr-8" htmlFor="classTh">
              기수
            </label>
            <input
              type="text"
              value={classTh}
              onChange={e => setClassTh(e.target.value)}
              className="bg-inherit border-[1px] border-[#7D7D7D] py-2 px-3 rounded-lg text-xs text-[#7D7D7D] fontRegular w-[150px]"
              placeholder="숫자만 입력해주세요."
              id="classTh"
            />
          </div>
          <div className="flex items-center py-4">
            <label className="text-xl w-[60px] mr-8" htmlFor="title">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-inherit border-[1px] border-[#7D7D7D] py-2 px-3 rounded-lg text-xs text-[#7D7D7D] fontRegular w-[500px]"
              placeholder="제목을 입력해주세요."
              id="title"
            />
          </div>
          <div className="flex items-center py-4">
            <label className="text-xl w-[60px] mr-8" htmlFor="subTitle">
              부제목
            </label>
            <input
              type="text"
              value={subTitle}
              onChange={e => setSubTitle(e.target.value)}
              className="bg-inherit border-[1px] border-[#7D7D7D] py-2 px-3 rounded-lg text-xs text-[#7D7D7D] fontRegular w-[500px]"
              placeholder="부제목을 입력해주세요."
              id="subTitle"
            />
          </div>
          <div className="flex items-center py-4">
            <label className="text-xl w-[60px] mr-8" htmlFor="url">
              링크
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="bg-inherit border-[1px] border-[#7D7D7D] py-2 px-3 rounded-lg text-xs text-[#7D7D7D] fontRegular w-[500px]"
              placeholder="프로젝트 링크를 입력해주세요."
              id="url"
            />
          </div>
          <div className="flex items-center py-4">
            <label className="text-xl w-[60px] mr-8" htmlFor="file">
              사진
            </label>
            <div>
              <input
                type="file"
                onChange={handleFileUpload}
                className="bg-inherit border-[1px] border-[#7D7D7D] py-2 px-3 rounded-lg text-xs text-[#7D7D7D] fontRegular w-[500px]"
                id="file"
              />
            </div>
          </div>
          <div className="flex items-center ">
            <div className="w-[60px] mr-8"></div>
            {(imagePreview || image) && (
              <div className="flex items-center py-4">
                <img
                  src={imagePreview}
                  alt="선택된 파일이 없습니다."
                  className="border-[1px] border-[#7D7D7D] rounded-3xl"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end py-4">
            <button type="submit" className="py-[6px] mx-2 text-sm text-white rounded-lg px-7 fontRegular bg-[#3B79FF]">
              수정
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="py-[6px] mx-2 text-sm rounded-lg px-7 fontRegular border-[1px]">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDetail;
