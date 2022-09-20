import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

function StudyListTitle() {
  return (
    <h1
      css={css`
        display: inline-block;
        font-size: 2.5rem;
      `}
    >
      모집중인 스터디
    </h1>
  );
}

export default StudyListTitle;
