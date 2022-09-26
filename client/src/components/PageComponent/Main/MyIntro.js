import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const intro = css`
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  width: 65%;
  max-height: 235px;
  padding: 25px;
  font-size: 15px;
`;

function MyIntro() {
  return <div css={intro}>MyIntro</div>;
}

export default MyIntro;
