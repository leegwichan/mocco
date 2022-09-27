import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useSetRecoilState } from 'recoil';
// import { studyTaskState } from '../atom/atom';
import request from '../api';
import TaskBox from '../components/PageComponent/StudyBoard/TaskBox/TaskBox';
import StudyRuleModal from '../components/PageComponent/StudyBoard/StudyRule/StudyRuleModal';

function StudyBoard() {
  const { studyId, memberId } = useParams();
  const [studyInfo, setStudyInfo] = useState({});
  // const setStudyTask = useSetRecoilState(studyTaskState);

  const getStudyInfo = () => {
    request(`/api/study-progress/${studyId}/member/${memberId}`).then((res) => {
      setStudyInfo(res.data.data);
      // setStudyTask(res.data.data.taskList);
    });
  };

  useEffect(() => {
    getStudyInfo();
  }, []);

  console.log(studyInfo);

  return (
    <main css={totalContainer}>
      <section css={titleSection}>
        <h1>모꼬스터디</h1>
        <StudyRuleModal />
      </section>
      <section css={animation}></section>
      <section css={taskSection}>
        <TaskBox studyInfo={studyInfo} studyId={studyId} />
      </section>
    </main>
  );
}

export default StudyBoard;

const totalContainer = css`
  width: 1200px;
  height: calc(100vh - 64px);
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
