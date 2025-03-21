import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { useLogin } from '../utils/LoginContext';
import * as base64js from 'base64-js';
import ShowSnackbar from './ShowSnackbar';
import API from '../utils/axios';

export const GoogleLoginBtn = ({ size, type, width, shape }) => {
  const { setIsLoggedIn, setContextUserInfo, setShowSnack } = useLogin();

  // Base64 디코딩 함수 사용하여 UTF-8 문자열로 변환(한글깨짐방지)
  function Base64Decode(str, encoding = 'utf-8') {
    while (str.length % 4 !== 0) {
      str += '=';
    }

    var bytes = base64js.toByteArray(str);
    return new TextDecoder(encoding).decode(bytes);
  }

  // 로그인
  const loginHandle = response => {
    const data = {
      token: response.credential,
    };

    API.post('/api/auth/google', data)
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('expire', JSON.stringify(Date.now() + 30 * 60 * 1000)); // 24시간 뒤 세션 만료
        // localStorage.setItem(
        //   "expire",
        //   JSON.stringify(Date.now() + 1 * 60 * 1000)
        // ); // 1분 후 만료 (test code)

        // payload 추출 후 디코딩
        const token = response.data.token;
        let payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.')); // payload 추출
        let decodedPayload = Base64Decode(payload); // Base64 디코딩
        let dec = JSON.parse(decodedPayload); // 파싱하여 JS 객체로 변환

        if (dec.track === 'FRONTEND') {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              name: dec.name,
              track: 'FRONT-END',
              color: '#FF7816',
              role: dec.role,
            }),
          );
          setContextUserInfo({
            name: dec.name,
            track: 'FRONT-END',
            color: '#FF7816',
          });
        } else if (dec.track === 'BACKEND') {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              name: dec.name,
              track: 'BACK-END',
              color: '#47EAEA',
              role: dec.role,
            }),
          );
          setContextUserInfo({
            name: dec.name,
            track: 'BACK-END',
            color: '#47EAEA',
          });
        } else {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              name: dec.name,
              track: 'DESIGN',
              color: '#FF669D',
              role: dec.role,
            }),
          );
          setContextUserInfo({
            name: dec.name,
            track: 'DESIGN',
            color: '#FF669D',
          });
        }

        setIsLoggedIn(true);
      })
      .catch(error => {
        // sungkyul 메일로 로그인 안했을 때 에러 처리
        if (error.response && error.response.status === 401) {
          setShowSnack({
            state: 'email',
            open: true,
          });
        }
      });
  };

  return (
    <>
      <GoogleLogin
        onSuccess={loginHandle}
        onError={() => console.log('Login Failed')}
        type={type}
        width={width} //버튼 크기 지정
        size="large"
        text="continue_with" //로그인 버튼 텍스트 지정 (구글에서 제공하는 문구만 사용)
        shape={shape} //버튼 shape 지정
        useOneTap="true" //팝업 창을 띄우지 않고 현재 탭에서 로그인
      />
      <ShowSnackbar />
    </>
  );
};

export default GoogleLoginBtn;
