import request from '../api';

function setAuthorizationToken(token) {
  if (token) {
    request.defaults.headers.common['AccessToken'] = token;
  } else {
    delete request.defaults.headers.common['AccessToken'];
  }
}

export default setAuthorizationToken;
