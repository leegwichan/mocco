import { css } from '@emotion/react';

function TaskItem({ task }) {
  // console.log(task);
  return (
    <div css={taskContainer}>
      <div css={deadline}>
        <div>~{task.deadline}</div>
      </div>
      <div css={content}>{task.content}</div>
      <div css={mark}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="73px"
          height="73px"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#0b6ff2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}

export default TaskItem;

const taskContainer = css`
  width: 1100px;
  height: 128px;
  background-color: #ffffff;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;
`;

const deadline = css`
  width: 168px;
  height: 128px;
  background-color: #0b6ff2;
  border-radius: 20px;

  div:nth-of-type(1) {
    font-size: 25px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    padding: 45px 0;
  }
`;

const content = css`
  font-size: 30px;
  margin-left: -25rem;
`;

const mark = css`
  margin-right: 40px;
`;
