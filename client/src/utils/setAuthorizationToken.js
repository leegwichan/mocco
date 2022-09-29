import request from '../api';

function setAuthorizationToken(token) {
  if (token) {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete request.defaults.headers.common['Authorization'];
  }
}

export default setAuthorizationToken;
