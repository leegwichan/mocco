import { css } from '@emotion/react';
const TaskList = css`
  display: flex;
  margin-bottom: 2rem;
`;

const TaskContainer = css`
  display: flex;
  margin-right: 0.5rem;
  align-items: flex-start;
`;

const DeleteButton = css`
  font-size: 1.5rem;
  line-height: 40px;
  border: none;
  background-color: white;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 300%;
    padding: 0;
  }
`;

const LeftContainer = css`
  display: inline-block;
  height: 100%;
  margin-right: 1rem;
`;

const TaskNumber = css`
  color: #0b7ff2;
  font-size: 2.5rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    line-height: 200%;
  }
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
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DueDate = css`
  display: block;
  height: 44px;
  margin-top: 10px;
  padding: 0 1rem;
  font-size: 1.2rem;
  border: 1px solid #999999;
  border-radius: 5px;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function Task({
  idx,
  taskValues,
  setTaskValues,
  studyBoardForm,
  setStudyBoardForm,
  setIsButtonDisable,
  startDate,
  endMaximumDate,
}) {
  // handle input change
  const handleTaskContentChange = (e) => {
    const newTaskValues = [...taskValues];
    newTaskValues[idx].content = e.target.value;
    setTaskValues([...newTaskValues]);
    setStudyBoardForm({ ...studyBoardForm, taskList: [...taskValues] });
  };

  const handleTaskDeadlineChange = (e) => {
    const newTaskValues = [...taskValues];
    newTaskValues[idx].deadline = e.target.value;
    setTaskValues([...newTaskValues]);
  };

  // handle delete button click
  const handleDeleteClick = (e) => {
    e.preventDefault();
    const newTaskValues = [...taskValues];
    newTaskValues.splice(idx, 1);
    setTaskValues([...newTaskValues]);
    if (taskValues.length <= 15) setIsButtonDisable(false);
  };
  return (
    <li css={TaskList}>
      <div css={TaskContainer}>
        <button onClick={handleDeleteClick} css={DeleteButton}>
          ❌
        </button>
      </div>
      <div css={LeftContainer}>
        <span css={TaskNumber}>Task {idx + 1}</span>
      </div>
      <div
        css={css`
          display: inline-block;
          flex: 1 0;
        `}
      >
        <input type="text" onChange={handleTaskContentChange} css={TaskInput} />
        <input
          type="date"
          min={startDate}
          max={endMaximumDate}
          onChange={handleTaskDeadlineChange}
          css={DueDate}
        />
      </div>
    </li>
  );
}

export default Task;
