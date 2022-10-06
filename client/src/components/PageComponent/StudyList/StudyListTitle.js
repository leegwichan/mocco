import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const Title = css`
  display: inline-block;
  font-size: 2.5rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

function StudyListTitle() {
  return <h1 css={Title}>모집중인 스터디</h1>;
}

export default StudyListTitle;
