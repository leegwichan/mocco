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
  width: 100%;
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  border: none;
`;
const iconn = css`
  margin-right: 10px;
`;
function GitHubBtnGray() {
  return (
    <button css={gray}>
      <FontAwesomeIcon css={iconn} icon={faGithub} />
      Git Hub
    </button>
  );
}

export default GitHubBtnGray;
