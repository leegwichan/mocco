import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const intro = css`
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  width: 65%;
  max-height: 250px;
  padding: 25px;
  font-size: 15px;
  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #2d2d2d;
  }
  .button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

function MyIntro({ introduction }) {
  return (
    <>
      {introduction ? (
        <div css={intro}>{introduction}</div>
      ) : (
        <div css={intro}>
          <div className="empty">자기소개가 없습니다</div>
        </div>
      )}
    </>
  );
}

export default MyIntro;
