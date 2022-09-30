import { css } from '@emotion/react';

function Alarm({ alarm }) {
  return (
    <li
      css={css`
        padding: 0.5rem;
        background-color: white;
        border-bottom: 1px solid #999999;
      `}
    >
      <div>1번 스터디</div>
      <div>{alarm.content}</div>
      <div
        css={css`
          text-align: right;
          font-size: 0.8rem;
        `}
      >
        22년 09월 30일
      </div>
    </li>
  );
}

export default Alarm;
