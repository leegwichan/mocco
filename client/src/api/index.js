import axios from 'axios';

const request = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  proxy: true,
});

export default request;
