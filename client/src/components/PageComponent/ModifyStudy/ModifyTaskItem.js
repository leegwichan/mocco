import { css } from '@emotion/react';

function ModifyTaskItem({
  task,
  idx,
  setEditContent,
  editContent,
  taskArr,
  setTaskArr,
}) {
  const deleteTaskHandler = (e) => {
    e.preventDefault();
    const deleteArr = [...taskArr];
    deleteArr.splice(idx, 1);
    setTaskArr([...deleteArr]);
    setEditContent({ ...editContent, taskList: [...taskArr] });
  };

  const onTaskChange = (e) => {
    const { name, value } = e.target;
    const changeArr = [...taskArr];
    changeArr[idx][name] = value;
    setTaskArr([...changeArr]);
    setEditContent({ ...editContent, taskList: [...taskArr] });
  };

  return (
    <div
      css={css`
        display: flex;
        margin-bottom: 40px;
      `}
    >
      <div css={delete_btn}>
        <button onClick={deleteTaskHandler}>❌</button>
      </div>
      <div css={task_title}>
        <span>Task {idx + 1}</span>
      </div>
      <div css={task_input}>
        <input
          type="text"
          name="content"
          defaultValue={task.content}
          onChange={onTaskChange}
        />
        <input
          type="date"
          name="deadline"
          defaultValue={task.deadline}
          onChange={onTaskChange}
        />
      </div>
    </div>
  );
}

export default ModifyTaskItem;

const delete_btn = css`
  display: flex;
  margin-right: 0.5rem;
  align-items: flex-start;

  button {
    font-size: 20px;
    line-height: 40px;
    border: none;
    background-color: white;
  }
`;

const task_title = css`
  display: inline-block;
  height: 100%;
  margin-right: 1rem;
  margin-top: -10px;

  span {
    color: #0b7ff2;
    font-size: 40px;
  }

  @media all and (max-width: 768px) {
    margin-top: -3px;

    span {
      font-size: 30px;
    }
  }
`;

const task_input = css`
  display: inline-block;
  flex: 1 0;

  input:nth-of-type(1) {
    display: block;
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    padding: 0 1rem;
    font-size: 1.2rem;
    border: 1px solid #999999;
    border-radius: 5px;
  }

  input:nth-of-type(2) {
    display: block;
    height: 44px;
    margin-top: 10px;
    padding: 0 1rem;
    font-size: 1.2rem;
    border: 1px solid #999999;
    border-radius: 5px;
  }
`;
