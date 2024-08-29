import axios from 'axios';

// Axios 인스턴스를 생성하는 함수인 axios.create() 함수에서 옵션을 설정하면, 인스턴스를 사용하는 모든 곳에 적용
const API = axios.create({
  baseURL: 'https://back.sku-sku.com',
  withCredentials: true,
});

export default API;