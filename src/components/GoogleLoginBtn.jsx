import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useLogin } from "../utils/LoginContext";
import * as base64js from "base64-js";
import ShowSnackbar from "./ShowSnackbar";
import API from "../utils/axios";

export const GoogleLoginBtn = ({ size, type, width, shape }) => {
  /*const { setIsLoggedIn, setContextUserInfo, setShowSnack } = useLogin();

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
  };*/

  const handleClick = () => {
    alert("새로운 스쿠스쿠를 사용해주세요! https://sku-sku.com/");
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: width || "auto",
      }}
    >
      {/* 시각적으로는 그대로 보여주되, 아래 컴포넌트는 클릭 못 하게 */}
      <div style={{ pointerEvents: "none" }}>
        <GoogleLogin
          onSuccess={() => {}}
          onError={() => {}}
          type={type}
          width={width}
          size={size}
          text="continue_with"
          shape={shape}
          useOneTap={false} // One Tap 확실히 끔
        />
      </div>

      {/* 클릭을 가로채는 투명 오버레이 */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="구글 로그인(안내)"
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      />

      {/* <ShowSnackbar /> */}
    </div>
  );
};

export default GoogleLoginBtn;
