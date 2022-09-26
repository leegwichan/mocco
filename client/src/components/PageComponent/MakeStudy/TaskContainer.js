import { css } from '@emotion/react';
import { useState } from 'react';
import Task from './Task';

const BigLabel = css`
  display: inline-block;
  border-bottom: 3px solid #0b6ff2;
  font-size: 2rem;
`;

function TaskContainer({ studyBoardForm, setStudyBoardForm }) {
  // Task 추가를 위한 index state
  const taskForm = {
    content: null,
    deadline: null,
  };

  const [taskValues, setTaskValues] = useState([{ ...taskForm }]);

  const handleMakeTaskButton = (e) => {
    e.preventDefault();
    setTaskValues([...taskValues, { ...taskForm }]);
    console.log(taskValues);
  };

  return (
    <div
      css={css`
        margin-top: 30px;
        margin-bottom: 120px;
      `}
    >
      <div
        css={css`
          display: flex;
          margin-bottom: 2rem;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div css={BigLabel}>스터디 TASK</div>
        <button
          onClick={handleMakeTaskButton}
          css={css`
            height: 40px;
            padding: 0 1rem;
            color: white;
            font-size: 1.1rem;
            border: none;
            border-radius: 8px;
            background-color: #0b6ff2;
            transition: all 0.1s linear;
            &:hover {
              color: #0b6ff2;
              background-color: white;
              border: 1px solid #0b6ff2;
            }
          `}
        >
          TASK 추가하기
        </button>
      </div>
      {/* Task 목록 */}
      <ul>
        {taskValues.map((task, idx) => {
          return (
            <Task
              key={idx}
              idx={idx}
              taskValues={taskValues}
              setTaskValues={setTaskValues}
              studyBoardForm={studyBoardForm}
              setStudyBoardForm={setStudyBoardForm}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TaskContainer;
