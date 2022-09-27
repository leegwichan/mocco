import { css } from '@emotion/react';
import SelectUser from './SelectUser';
import TaskItem from './TaskItem';

function TaskBox({ studyInfo }) {
  return (
    <div css={taskBox}>
      <div css={taskTop}>
        <div>Task</div>
        <div>ProgressBar</div>
        <SelectUser memberInfo={studyInfo.memberList} />
      </div>
      <div css={taskList}>
        {studyInfo.taskList &&
          studyInfo.taskList.map((task) => (
            <div key={task.taskId}>
              <TaskItem task={task} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default TaskBox;

const taskBox = css`
  background-color: #f0f8ff;
  padding: 50px;
`;

const taskTop = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  div:nth-of-type(1) {
    font-size: 40px;
    font-weight: 600;
  }
`;

const taskList = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
