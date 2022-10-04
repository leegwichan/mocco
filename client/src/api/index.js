import axios from 'axios';

const request = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  proxy: true,
});

request.defaults.headers.common['AccessToken'] =
  localStorage.getItem('accessToken');

// request.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     const originalRequest = config;

//     if (status === 401) {
//       const refreshToken = localStorage.get('refreshToken');
//       const { headers } = await axios.post(
//         '/api/reissue',
//         {},
//         { headers: { refreshToken } }
//       );

//       console.log('interceptors headers', headers);

//       return request(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );

// 1. 서버로 요청 날림
// 2. 서버에서 403 날려줌
// 3. 응답을 가로채서 에러 났을때 서버로 다시 acessToken 재발급 요청
// 4. 재발급 받고 그 토큰을 가지고 다시 요청
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
