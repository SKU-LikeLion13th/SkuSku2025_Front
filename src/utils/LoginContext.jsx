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
    const token = JSON.parse(localStorage.getItem('token'));
    const expire = JSON.parse(localStorage.getItem('expire'));
  
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
      name, setName, track, setTrack, trackColor, setTrackColor
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);