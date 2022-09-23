import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const gray = css`
  background-color: #999999;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 7px;
  padding-bottom: 8px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  border: none;
  :hover {
    background-color: white;
    color: #0b6ff2;
  }
`;
const iconn = css`
  margin-right: 10px;
`;
function GitHubBtnMyGray() {
  const navigate = useNavigate();
  return (
    <button css={gray} onClick={() => navigate('/login')}>
      <FontAwesomeIcon css={iconn} icon={faGithub} />
      Git Hub 연동하기
    </button>
  );
}

export default GitHubBtnMyGray;
