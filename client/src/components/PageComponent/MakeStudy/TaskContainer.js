import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Task from './Task';

const BigLabel = css`
  display: inline-block;
  border-bottom: 3px solid #0b6ff2;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ValidStar = css`
  color: red;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AddTask = css`
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
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DisableAddTask = css`
  height: 40px;
  padding: 0 1rem;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  background-color: #999999;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function TaskContainer({
  studyBoardForm,
  setStudyBoardForm,
  startDate,
  endMaximumDate,
}) {
  const [taskValues, setTaskValues] = useState([]);
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  useEffect(() => {
    if (studyBoardForm.startDate !== null && studyBoardForm.endDate !== null)
      setIsButtonDisable(false);
  }, [studyBoardForm]);

  const handleMakeTaskButton = (e) => {
    e.preventDefault();
    setTaskValues([...taskValues, {}]);
    if (taskValues.length >= 14) setIsButtonDisable(true);
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
        <div>
          <div css={BigLabel}>스터디 TASK</div>
          <span css={ValidStar}> *</span>
        </div>
        <button
          disabled={isButtonDisable ? true : false}
          onClick={handleMakeTaskButton}
          css={isButtonDisable ? DisableAddTask : AddTask}
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
              setIsButtonDisable={setIsButtonDisable}
              startDate={startDate}
              endMaximumDate={endMaximumDate}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TaskContainer;
