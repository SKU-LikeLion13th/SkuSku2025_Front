import React from 'react'

export const getToken = () => {
	//로컬스토리지 값을 가져와서 JSON을 Object로 변환해준다.
	const myToken = JSON.parse(localStorage.getItem('token'));
	// 토큰이 없거나 만료되었다면 삭제하고 null을 리턴한다
	if (!myToken)
		return null;
	if (myToken.expire <= Date.now()){
		localStorage.removeItem('token')
		return null;
	}
	return myToken.token
}

export const Logout = () => {
	// 로그아웃 버튼을 클릭하면 스토리지에서 token을 삭제
	localStorage.removeItem('token');
    // token이 삭제되면 로그인 버튼이 다시 출력되도록 리로드
	window.location.reload();
}