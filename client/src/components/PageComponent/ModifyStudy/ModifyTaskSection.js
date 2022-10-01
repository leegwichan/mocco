import ModifyTaskItem from './ModifyTaskItem';
import { css } from '@emotion/react';
import Button from '../../Common/Button';

function ModifyTaskSection({
  editContent,
  setEditContent,
  taskArr,
  setTaskArr,
  id,
}) {
  const newTaskInfo = {
    content: null,
    deadline: null,
    studyId: id,
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    setTaskArr([...taskArr, { ...newTaskInfo }]);
    console.log(taskArr);
  };

  return (
    <div css={task_container}>
      <div css={task_top}>
        <div>스터디 TASK</div>
        <Button
          type={'big_blue'}
          text={'Task 추가하기'}
          onClick={addTaskHandler}
        />
      </div>
      <ul>
        {taskArr.map((task, idx) => {
          return (
            <ModifyTaskItem
              key={idx}
              setEditContent={setEditContent}
              editContent={editContent}
              taskArr={taskArr}
              setTaskArr={setTaskArr}
              task={task}
              idx={idx}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ModifyTaskSection;

const task_container = css`
  margin-top: 30px;
  margin-bottom: 120px;
`;

const task_top = css`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;

  div {
    display: inline-block;
    border-bottom: 3px solid #0b6ff2;
    font-size: 2rem;
  }

  @media all and (max-width: 768px) {
    div {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
