import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

function MakeStudyButton() {
  return (
    <button
      css={css`
        width: 120px;
        height: 40px;
        font-size: 18px;
        color: white;
        border: none;
        border-radius: 8px;
        background-color: #0b6ff2;
        transition: all 0.1s linear;
        &:hover {
          color: #0b6ff2;
          border: 1px solid #0b6ff2;
          background-color: white;
        }
      `}
    >
      스터디 만들기
    </button>
  );
}

export default MakeStudyButton;
