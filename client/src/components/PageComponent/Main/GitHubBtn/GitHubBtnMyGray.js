import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const gray = css`
  background-color: #999999;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  width: 110%;
  padding: 7px;
  padding-bottom: 8px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  border: none;
  :hover {
    background-color: #0b6ff2;
    color: white;
  }
`;
const iconn = css`
  margin-right: 10px;
`;
function GitHubBtnMyGray() {
  const connectURI = `https://github.com/login/oauth/authorize?client_id=Iv1.56f7d0178056b5a9&redirect_uri=http://localhost:3000/oauthcallback`;
  return (
    <a href={connectURI}>
      <button css={gray} type="button">
        <FontAwesomeIcon css={iconn} icon={faGithub} />
        Git Hub 연동하기
      </button>
    </a>
  );
}

export default GitHubBtnMyGray;
