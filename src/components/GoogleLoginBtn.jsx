import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import axios from 'axios'
import { useLogin } from '../utils/LoginContext';
import * as base64js from 'base64-js';

export const GoogleLoginBtn = ({size, type, width, shape}) => {
  const { setIsLoggedIn } = useLogin();

  // Base64 디코딩 함수 사용하여 UTF-8 문자열로 변환(한글깨짐방지)
  function Base64Decode(str, encoding = 'utf-8') {
    while (str.length % 4 !== 0) {
        str += '=';
    }

    var bytes = base64js.toByteArray(str);
    return new TextDecoder(encoding).decode(bytes);
  }

  // 로그인
  const loginHandle = (response) => {
    const data = {
      "token" : response.credential
    };

    axios.post("http://back.sku-sku.com/api/auth/google", data)
    .then(response => {
      // 성공시 응답 값 myToken에 저장
      const myToken = {
				token: response.data.token,
				expire: Date.now() + 60 * 60 * 1000
			};

      // 로컬스토리지에 정보 저장
			localStorage.setItem('token', JSON.stringify(myToken.token));
			localStorage.setItem('expire', JSON.stringify(myToken.expire));

      // 로그인 상태 ON
      setIsLoggedIn(true);
      
      // 로그인 성공시 새로고침
			// window.location.reload()

      // JWT 토큰에서 payload 부분을 추출하고 디코딩
      const token = myToken.token; // 인코딩된 JWT
      let payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.')); // payload 추출
      let decodedPayload = Base64Decode(payload); // Base64 디코딩
      let dec = JSON.parse(decodedPayload); // 파싱하여 JS 객체로 변환

      console.log('dec', dec);
      console.log('name', dec.name); // 한국어가 올바르게 출력됨
      console.log('track', dec.track); // 영어도 문제없이 출력됨
    })
    .catch(error => {
      // 실패 시 에러 메시지 출력
      console.log(error);
    });
  };

	return (
		<>
			<GoogleLogin
				onSuccess={loginHandle}
				onError={() => {
					console.log("Login Failed");
            //로그인 실패 시 Login Failed가 console로 출력
				}}
        type={type}
        width={width} //버튼 크기 지정
        size='large'
				text="continue_with" //로그인 버튼 텍스트 지정 (구글에서 제공하는 문구만 사용)
				shape={shape} //버튼 shape 지정
        useOneTap='true'//팝업 창을 띄우지 않고 현재 탭에서 로그인
				/>
		</>
	)
}

export default GoogleLoginBtn