import { css } from '@emotion/react';

const TaskList = css`
  display: flex;
`;

const TaskContainer = css`
  display: flex;
  margin-right: 0.5rem;
  align-items: flex-start;
`;

const DeleteButton = css`
  font-size: 20px;
  line-height: 40px;
  border: none;
  background-color: white;
`;

const LeftContainer = css`
  display: inline-block;
  height: 100%;
  margin-right: 1rem;
`;

const TaskNumber = css`
  color: #0b7ff2;
  font-size: 40px;
`;

const TaskInput = css`
  display: block;
  width: 100%;
  height: 45px;
  margin-bottom: 10px;
  padding: 0 1rem;
  font-size: 1.2rem;
  border: 1px solid #999999;
  border-radius: 5px;
`;

const DueDate = css`
  display: block;
  height: 44px;
  margin-top: 10px;
  padding: 0 1rem;
  font-size: 1.2rem;
  border: 1px solid #999999;
  border-radius: 5px;
`;

function Task({ taskNumber }) {
  return (
    <li css={TaskList}>
      <div css={TaskContainer}>
        <button css={DeleteButton}>❌</button>
      </div>
      <div css={LeftContainer}>
        <span css={TaskNumber}>Task {taskNumber}</span>
      </div>
      <div
        css={css`
          display: inline-block;
          flex: 1 0;
        `}
      >
        <input type="text" css={TaskInput} />
        <input type="date" css={DueDate} />
      </div>
    </li>
  );
}

export default Task;
