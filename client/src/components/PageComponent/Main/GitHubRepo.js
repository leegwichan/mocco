import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const container = css`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const gitHubBtn = css`
  width: 100%;
  background-color: #0b6ff2;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  height: 65px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  border: none;
  :hover {
    background-color: white;
    a {
      color: #0b6ff2;
    }
  }
`;
const textdeco = css`
  text-decoration-line: none;
  color: white;
`;

const gitHubBtnGray = css`
  background-color: #999999;
  width: 100%;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  height: 65px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const icon = css`
  margin-right: 10px;
`;
function GitHubRepo({ githubRepositoryList }) {
  return (
    <section css={container}>
      <button
        css={
          githubRepositoryList && githubRepositoryList[0]
            ? gitHubBtn
            : gitHubBtnGray
        }
      >
        {githubRepositoryList && githubRepositoryList[0] ? (
          <a href={githubRepositoryList[0]} css={textdeco}>
            <FontAwesomeIcon css={icon} icon={faGithub} />
            GitHub Repository 3
          </a>
        ) : (
          <>
            <FontAwesomeIcon css={icon} icon={faGithub} />
            <div>GitHub Repository 3</div>
          </>
        )}
      </button>
      <button
        css={
          githubRepositoryList && githubRepositoryList[1]
            ? gitHubBtn
            : gitHubBtnGray
        }
      >
        {githubRepositoryList && githubRepositoryList[1] ? (
          <a href={githubRepositoryList[1]} css={textdeco}>
            <FontAwesomeIcon css={icon} icon={faGithub} />
            GitHub Repository 2
          </a>
        ) : (
          <>
            <FontAwesomeIcon css={icon} icon={faGithub} />
            <div>GitHub Repository 2</div>
          </>
        )}
      </button>

      <button
        css={
          githubRepositoryList && githubRepositoryList[2]
            ? gitHubBtn
            : gitHubBtnGray
        }
      >
        {githubRepositoryList && githubRepositoryList[2] ? (
          <a href={githubRepositoryList[2]} css={textdeco}>
            <FontAwesomeIcon css={icon} icon={faGithub} />
            GitHub Repository 3
          </a>
        ) : (
          <>
            <FontAwesomeIcon css={icon} icon={faGithub} />
            <div>GitHub Repository 3</div>
          </>
        )}
      </button>
    </section>
  );
}

export default GitHubRepo;
