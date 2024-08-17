import React, { useState, useEffect } from 'react';
import { images } from '../utils/images';

const LectureBoard = ({ lectures, onSelectLecture }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(lectures);
  const [sortOrder, setSortOrder] = useState("title");

  const itemsPerPage = 16;

  useEffect(() => {
    handleSortChange(sortOrder);
  }, [sortOrder, lectures]);

  useEffect(() => {
    setFilteredData(lectures);
  }, [lectures]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleInputChange = (e) => {
    setInputPage(Number(e.target.value));
  };

  const handlePageChange = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      setCurrentPage(inputPage);
    } else {
      alert(`1과 ${totalPages} 사이의 페이지 번호를 입력하세요.`);
    }
  };

  const handleSearchCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = lectures.filter(item => {
      return item[searchCategory]?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleSortChange = (sortType) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortType === "title") {
        return new Date(b.date) - new Date(a.date); // 최신순
      } else if (sortType === "author") {
        return new Date(a.date) - new Date(b.date); // 오래된 순
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleSelectChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="w-3/4 my-5 fontSB">
        <select
          className="rounded-md py-2 px-1"
          value={sortOrder}
          onChange={handleSelectChange}
        >
          <option value="title">최신순</option>
          <option value="author">오래된 순</option>
        </select>
      </div>
      <div className="w-3/4 min-h-screen">
        <div className="grid grid-cols-11 fontBold justify-center items-center text-center bg-[#F7F7F7] w-full h-12 border-t-[2.5px] border-b-[0.1px] border-black">
          <p>번호</p>
          <p className="col-span-7">제목</p>
          <p>작성자</p>
          <p>작성일</p>
          <p>조회수</p>
        </div>
        {currentData.length > 0 ? (
          currentData.map((item, index) => (
            <div className='fontLight' key={index} onClick={() => onSelectLecture(item)}>
              <div className="grid grid-cols-11 items-center text-center w-full h-12 cursor-pointer">
                <p>{item.id}</p>
                <p className="flex items-center col-span-7 text-start">{item.title}
                  {item.joinLectureFiles ? <img src={images.download} className='pl-4 h-4' alt="download icon"></img> : <div> </div>}
                </p>
                <p>{item.writer}</p>
                <p>{item.createDate}</p>
                <p>{item.views}</p>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div className="text-center fontLight py-20 text-[#6C6C6C]">
            등록된 강의자료가 없습니다.
          </div>
        )}
      </div>
      <div className='grid grid-cols-3 w-3/4 mx-auto justify-between mt-20 items-center'>
        <div className="fontLight">
          전체 게시물수: <span className="text-[#3b79ff] ml-1 mr-3">{filteredData.length}</span>
          전체 페이지: <span className="ml-1 text-[#ff7816]">{totalPages}</span>
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handlePageChange()}
            className='text-right ml-4 mr-3 px-2 w-12 border-2 rounded-sm'
          />
          <button onClick={handlePageChange} className="border-2 rounded-sm px-2">보기</button>
        </div>
        <div className='fontLight text-center'>- {currentPage} -</div>
        <div className='text-end flex justify-end fontLight'>
          <div className="relative inline-block">
            <select
              value={searchCategory}
              onChange={handleSearchCategoryChange}
              className="text-[#707070] border-r-0 rounded-l-md border-2 border-gray-300 px-2 py-[5.5px]"
            >
              <option value="title">제목</option>
              <option value="author">작성자</option>
            </select>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchQuery}
              onChange={handleSearchQueryChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="border-2 rounded-r-md border-gray-300 py-1 px-3"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 border-gray-300 px-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="#D8D8D8" d="M15.096 5.904a6.5 6.5 0 1 0-9.192 9.192a6.5 6.5 0 0 0 9.192-9.192M4.49 4.49a8.5 8.5 0 0 1 12.686 11.272l5.345 5.345l-1.414 1.414l-5.345-5.345A8.501 8.501 0 0 1 4.49 4.49" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureBoard;
