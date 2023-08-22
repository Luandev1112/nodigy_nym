import axios from 'axios';
const API_URL = (process.env.NODE_ENV === 'test') ? process.env.BASE_URL || (`http://localhost:${process.env.PORT}/`) : `/`;
const token = localStorage.getItem('access_token');
const barearToken = 'Bearer '+token;
// let token = document.head.querySelector('meta[name="csrf-token"]');
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common.Authorization = barearToken;
// axios.defaults.headers.common['X-CSRF-Token'] = token.content;
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      
    }
    return Promise.reject(error);
  });

export default axios
