import { useRef, useEffect, useState } from 'react';
import { css } from '@emotion/react';

function UserProgressBar({ taskList, total }) {
  const [endTask, setEndTask] = useState(0);
  const bar = useRef(null);

  useEffect(() => {
    const arr = taskList.filter((i) => i.taskCheck.taskChecked === true);
    setEndTask(arr.length);
    bar.current.style.width = (endTask / total) * 100 + '%';
  }, [taskList]);

  console.log('total' + total);
  console.log('endTask' + endTask);

  return (
    <div>
      <div css={Container}>
        <div css={Progress} ref={bar}></div>
        <div className="number">{(endTask / total) * 100 + '%'}</div>
      </div>
    </div>
  );
}

export default UserProgressBar;

const Container = css`
  width: 535px;
  height: 45px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  .number {
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    font-size: 20px;
    font-weight: 600;
    margin-left: 5px;
    margin-right: 10px;
    color: #0b6ff2;
  }
`;

const Progress = css`
  background-color: gray;
  height: 100%;
  background: #0f6ad5;
  border-radius: 10px;
  margin-right: 5px;
`;
