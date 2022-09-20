import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const intro = css`
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  width: 65%;
  max-height: 250px;
  padding: 25px;
  font-size: 15px;
`;

function MyIntro({ introduction }) {
  return <div css={intro}>{introduction}</div>;
}

export default MyIntro;
