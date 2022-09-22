import { css } from '@emotion/react';

function TaskItem({ task }) {
  return (
    <div
      css={css`
        height: 88px;
        background-color: #f0f8ff;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 36px;

        .study_rule {
          font-size: 18px;
          font-weight: 500;
          color: #0b6ff2;
        }

        .task_info {
          width: 1003px;
          height: 54px;
          background-color: #ffffff;
          display: flex;
          align-items: center;

          span {
            font-size: 15px;
            margin-left: 35px;
          }
        }
      `}
    >
      <span className="study_rule">{`Task ${task.taskId}`}</span>
      <div className="task_info">
        <span>{`${task.content}  [~ ${task.deadline}]`}</span>
      </div>
    </div>
  );
}

export default TaskItem;
