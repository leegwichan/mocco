import { css } from '@emotion/react';
// import { useState } from 'react';
// import Button from '../components/Common/Button';
import TaskBox from '../components/PageComponent/StudyBoard/TaskBox/TaskBox';
import StudyRuleModal from '../components/PageComponent/StudyBoard/StudyRule/StudyRuleModal';

function StudyBoard() {
  return (
    <main css={totalContainer}>
      <section css={titleSection}>
        <h1>모꼬스터디</h1>
        <StudyRuleModal />
      </section>
      <section css={animation}></section>
      <section css={taskSection}>
        <TaskBox />
      </section>
    </main>
  );
}

export default StudyBoard;

const totalContainer = css`
  width: 1200px;
  margin: 0 auto;
  margin-top: 47px;
  margin-bottom: 85px;
  border: 1px solid red;
`;

const titleSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  margin-bottom: 20px;
`;

const animation = css`
  border: 1px solid green;
  height: 407px;
`;

const taskSection = css`
  margin-top: 24px;
`;
