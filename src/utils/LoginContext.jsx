import React, { createContext, useState, useContext, useEffect } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 토큰 얻기
  const getToken = () => {
    //로컬스토리지 값을 가져와서 JSON을 Object로 변환해준다.
    const token = JSON.parse(localStorage.getItem('token'));
    const expire = JSON.parse(localStorage.getItem('expire'));
  
    // 토큰이 없거나 만료되었다면 삭제하고 null을 리턴한다
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
    window.location.reload();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    // localStorage에서 토큰을 가져와서 유무를 판별하여 isLoggedIn 상태 설정
    const token = getToken();
    setIsLoggedIn(token); // 토큰이 있으면 true, 없으면 false
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);