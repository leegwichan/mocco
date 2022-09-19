import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const container = css`
  width: 15%;
`;
const gitHubBtn = css`
  background-color: #0b6ff2;
  width: 100%;
`;

function GitHubRepo() {
  return (
    <section css={container}>
      <button css={gitHubBtn}>GitHub Repository 1</button>
      <button css={gitHubBtn}>GitHub Repository 2</button>
      <button css={gitHubBtn}>GitHub Repository 3</button>
    </section>
  );
}

export default GitHubRepo;
