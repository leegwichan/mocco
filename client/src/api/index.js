import axios from 'axios';

const request = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  proxy: true,
});

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

export default request;
