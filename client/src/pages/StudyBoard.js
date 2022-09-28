import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';
import request from '../api';
import TaskBox from '../components/PageComponent/StudyBoard/TaskBox/TaskBox';
import StudyRuleModal from '../components/PageComponent/StudyBoard/StudyRuleModal';

function StudyBoard() {
  const { studyId, memberId } = useParams();
  const [studyInfo, setStudyInfo] = useState({});
  const userInfo = useRecoilValue(userInfoState);
  const nowStudy = {
    ...userInfo.progressStudy.filter((el) => el.studyId === Number(studyId)),
  }[0];
  // console.log(nowStudy);

  const getStudyInfo = () => {
    request(`/api/study-progress/${studyId}/member/${memberId}`).then((res) => {
      setStudyInfo(res.data.data);
    });
  };

  useEffect(() => {
    getStudyInfo();
  }, []);

  console.log(studyInfo);

  return (
    <main css={totalContainer}>
      <div css={contentContainer}>
        <section css={titleSection}>
          <h1>{nowStudy.teamName}</h1>
          <StudyRuleModal />
        </section>
        <section css={animation}></section>
        <section css={taskSection}>
          <TaskBox studyInfo={studyInfo} studyId={studyId} />
        </section>
      </div>
    </main>
  );
}

export default StudyBoard;

const totalContainer = css`
  width: 100vw;
  height: calc(100vh - 64px);
  padding-top: 100px;
`;

const contentContainer = css`
  max-width: 1200px;
  margin: 0 auto;
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
