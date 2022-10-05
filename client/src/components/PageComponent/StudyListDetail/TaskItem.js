import { css } from '@emotion/react';

function TaskItem({ task, idx }) {
  return (
    <div css={container}>
      <span className="study_rule">{`Task ${idx + 1}`}</span>
      <div className="task_info">
        <span>{task.content}</span>
        <span className="deadline">{task.deadline}</span>
      </div>
    </div>
  );
}

export default TaskItem;

const container = css`
  min-height: 88px;
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
    margin-right: -22px;
  }

  .task_info {
    width: 85%;
    margin: 10px 0;
    min-height: 54px;
    height: auto;
    margin: 0 1rem;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 15px;
      margin-left: 35px;
      word-break: break-all;
    }

    .deadline {
      margin-right: 35px;
    }
  }

  @media all and (max-width: 768px) {
    height: 75px;
    margin-top: 26px;

    .study_rule {
      font-size: 18px;
    }

    .task_info {
      width: 78%;
      height: 50px;

      span {
        margin-left: 15px;
        font-size: 0.9rem;
      }

      .deadline {
        margin-right: 15px;
        font-size: 0.9rem;
      }
    }
  }
`;
