import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'
import { useLogin } from '../utils/LoginContext';

export const GoogleLoginBtn = () => {
  const { setIsLoggedIn } = useLogin();

  const loginHandle = (response) => {
    // JWT 디코딩 예시 (필요한 경우)
    const decodeToken = jwtDecode(response.credential);
    console.log(decodeToken, '디코딩 된 토큰');

    const data = {
      "token" : response.credential
    };

    axios.post("http://back.sku-sku.com/api/auth/google", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // 성공적인 요청 시 response 값을 콘솔에 출력
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
			window.location.reload()
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
        type="x-smartling-placeholder"
        theme= "filled_black"
        width='200px' //버튼 크기 지정
				text="continue_with" //로그인 버튼 텍스트 지정 (구글에서 제공하는 문구만 사용)
				shape='circle' //버튼 shape 지정
        useOneTap='true'//팝업 창을 띄우지 않고 현재 탭에서 로그인  
				/>
		</>
	)
}

export default GoogleLoginBtn