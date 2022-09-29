import request from '../api';

function setAuthorizationToken(token) {
  console.log(request.defaults.headers);
  console.log(request.defaults.headers.common);
  if (token) {
    request.defaults.headers.common['AccessToken'] = token;
  } else {
    delete request.defaults.headers.common['AccessToken'];
  }
}

export default setAuthorizationToken;
