import { css } from '@emotion/react';
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import AuthTaskModal from '../AuthTask/AuthTaskModal';

function TaskItem({ task, select, taskHandlerf }) {
  const [isOpen, setIsOpen] = useState(false);

  let year = new Date().getFullYear().toString();
  let month = new Date().getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let day = new Date().getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();

  const today = `${year}-${month}-${day}`;

  console.log(today);

  return (
    <div>
      <div css={taskContainer}>
        <div css={deadline}>
          <div>~{task.deadline}</div>
        </div>
        <div css={content}>{task.content}</div>
        <div css={mark}>
          {task.deadline < today && !task.taskCheck.taskChecked ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                width="73px"
                height="73px"
                stroke="#ff0000"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="fail">실패</span>
            </>
          ) : task.taskCheck.taskCheckId ? (
            <>
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                fill="#0b68ff"
                width="73px"
                height="73px"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setIsOpen(true)}
              >
                <path
                  d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                  fillRule="nonzero"
                />
              </svg>
              <span className="check">완료</span>
            </>
          ) : (
            <>
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                fill="#0b68ff"
                width="73px"
                height="73px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setIsOpen(true)}
              >
                <path
                  d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                  fillRule="nonzero"
                />
              </svg>
              <span className="check">인증</span>
            </>
          )}
          {isOpen && (
            <AuthTaskModal
              task={task}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              select={select}
              taskHandlerf={taskHandlerf}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

const taskContainer = css`
  width: 990px;
  height: 128px;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 3px rgb(0 0 0 / 10%);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;

  .check {
    color: #0b68ff;
    font-weight: 500;
  }

  .fail {
    color: #ff0000;
    font-weight: 500;
  }
`;

const deadline = css`
  width: 168px;
  height: 128px;
  background-color: #0b6ff2;
  border-radius: 20px;

  div:nth-of-type(1) {
    font-size: 25px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    padding: 45px 0;
  }
`;

const content = css`
  font-size: 30px;
  /* margin-left: -25rem; */
`;

const mark = css`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
`;
