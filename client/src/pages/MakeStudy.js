import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const Header = css`
  width: 100%;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MainContainer = css`
  width: 100%;
  height: calc(100vh - 64px);
`;

function MakeStudy() {
  return (
    <>
      <header css={Header}></header>
      <main css={MainContainer}></main>
    </>
  );
}

export default MakeStudy;
