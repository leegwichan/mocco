import axios from 'axios';

const request = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  proxy: true,
});

request.defaults.headers.common['AccessToken'] =
  localStorage.getItem('accessToken');

// AccessToken 재발급
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 403) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const data = await axios({
        method: 'post',
        url: '/api/register/refresh',
        headers: { RefreshToken: refreshToken, AccessToken: accessToken },
        proxy: true,
      });
      console.log(data);
    }
    return Promise.reject(error);
  }
);

export default request;
