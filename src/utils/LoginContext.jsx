import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [track, setTrack] = useState('');
  const [trackColor, setTrackColor] = useState('');

  // 토큰 얻기
  const getInfo = () => {
    // 로컬스토리지 값 JSON > Object 변환
    const token = JSON.parse(localStorage.getItem('token'));
    const expire = JSON.parse(localStorage.getItem('expire'));
    const storedName = localStorage.getItem('name');
    const storedTrack = localStorage.getItem('track');

    console.log(storedTrack, '트랙 ;')

    if (storedTrack === 'PM/DESIGN') {
      setTrackColor('#FF669D')
    } else if (storedTrack === 'FRONTEND' || 'FRONT-END') {
      setName(storedName)
      setTrack('FRONT-END')
      setTrackColor('#FF7816')
    } else {
      setName(storedName)
      setTrack('BACK-END')
      setTrackColor('#47EAEA')
    }
  
    // 토큰이 없거나 만료되었다면 삭제 후 null 리턴
    if (!token)
      return null;
    if (expire <= Date.now()){
      localStorage.removeItem('token')
      return null;
    }
    return token
  }

  // 로그아웃
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/')
  }

  useEffect(() => {
    // localStorage에서 토큰을 가져와서 유무를 판별하여 isLoggedIn 상태 설정
    const token = getInfo();
    setIsLoggedIn(token); // 토큰이 있으면 true, 없으면 false

    
  }, []);

  return (
    <LoginContext.Provider value={{ 
      handleLogout,
      isLoggedIn, setIsLoggedIn,
      name, setName, track, setTrack, trackColor
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);