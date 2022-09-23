import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const blue = css`
  background-color: #0b6ff2;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  width: 9vw;
  max-width: 180px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  border: none;
  :hover {
    background-color: white;
    color: #0b6ff2;
  }
`;
const textdeco = css`
  text-decoration-line: none;
`;
const icon = css`
  margin-right: 10px;
`;
function GitHubBtnBlue({ githubId }) {
  return (
    <a href={'https://github.com/' + githubId} css={textdeco}>
      <button css={blue}>
        <FontAwesomeIcon css={icon} icon={faGithub} />
        Git Hub
      </button>
    </a>
  );
}

export default GitHubBtnBlue;
