import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

request.defaults.headers.common['AccessToken'] =
  localStorage.getItem('accessToken');

// AccessToken 재발급
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.message === '이미 만료된 토큰입니다.'
    ) {
      const data = await request({
        method: 'post',
        url: '/api/register/refresh',
        headers: {
          RefreshToken: localStorage.getItem('refreshToken'),
          AccessToken: localStorage.getItem('accessToken'),
        },
        // proxy: true,
      }).then((res) => {
        localStorage.setItem('accessToken', res.headers.accesstoken);
        localStorage.setItem('refreshToken', res.headers.refreshtoken);
        setAuthorizationToken(res.headers.accesstoken);
      });

      if (data?.isAxiosError) return Promise.reject(data);

      return await request({
        ...error.config,
        headers: {
          ...error.config.headers,
          AccessToken: localStorage.getItem('accessToken'),
        },
      });
    }
    return Promise.reject(error);
  }
);

export default request;
