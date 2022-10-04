import { css } from '@emotion/react';

function Alarm({ alarm, handleDeleteAlarm }) {
  return (
    <li
      css={css`
        position: relative;
        padding: 0.5rem;
        background-color: white;
        border-bottom: 1px solid #999999;
      `}
    >
      <button
        onClick={() => handleDeleteAlarm(alarm.alarmId)}
        css={css`
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          border: none;
          background: none;
          font-weight: bold;
          color: #999999;
          &:hover {
            color: #0b6ff2;
          }
        `}
      >
        X
      </button>
      <div
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        모코모코
      </div>
      <div>{alarm.content}</div>
      <div
        css={css`
          text-align: right;
          font-size: 0.8rem;
        `}
      >
        {alarm.createdAt}
      </div>
    </li>
  );
}

export default Alarm;
