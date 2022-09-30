import { css } from '@emotion/react';
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import AuthTaskModal from '../AuthTask/AuthTaskModal';

function TaskItem({ task, select }) {
  const [isOpen, setIsOpen] = useState(false);

  // const onChange = () => {
  //   setIsOpen(true);
  // };

  return (
    <div>
      <div css={taskContainer}>
        <div css={deadline}>
          <div>~{task.deadline}</div>
        </div>
        <div css={content}>{task.content}</div>
        <div css={mark}>
          {task.taskCheck.taskCheckId ? (
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
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

const taskContainer = css`
  width: 1100px;
  height: 128px;
  background-color: #ffffff;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;

  .check {
    color: #0b68ff;
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
