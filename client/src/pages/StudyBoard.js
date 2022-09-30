import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { mypageOwnerAtom } from '../atom/atom';
import request from '../api';
import TaskBox from '../components/PageComponent/StudyBoard/TaskBox/TaskBox';
import StudyRuleModal from '../components/PageComponent/StudyBoard/StudyRuleModal';
import ProgressSection from '../components/PageComponent/StudyBoard/Progress/ProgressSection';
import Footer from '../components/Common/Footer';

function StudyBoard() {
  const { studyId, memberId } = useParams();
  const [studyInfo, setStudyInfo] = useState({});
  const userInfo = useRecoilValue(mypageOwnerAtom);
  const nowStudy = {
    ...userInfo.progressStudy.filter((el) => el.studyId === Number(studyId)),
  }[0];
  console.log(nowStudy);
  const [totalTask, setTotalTask] = useState(0);
  const [expiredTaskCount, setExpiredTaskCount] = useState(0);
  const [memberProgressArr, setMemberProgressArr] = useState();
  const [selectedId, setSelectedId] = useState(memberId);

  useEffect(() => {
    getStudyInfo();
  }, []);

  console.log(studyInfo);

  const getStudyInfo = () => {
    request(`/api/study-progress/${studyId}/member/${memberId}`)
      .then((res) => {
        setStudyInfo(res.data.data);
        return res;
      })
      .then((res) => {
        setTotalTask(res.data.data.progress.totalTaskCount);
        return res;
      })
      .then((res) => {
        setExpiredTaskCount(res.data.data.progress.expiredTaskCount);
        return res;
      })
      .then((res) => {
        setMemberProgressArr(res.data.data.progress.memberProgress);
      });
  };

  return (
    <main css={totalContainer}>
      <div css={contentContainer}>
        <section css={titleSection}>
          <h1>{nowStudy.teamName}</h1>
          <StudyRuleModal />
        </section>
        <section css={animation}>
          <ProgressSection
            studyInfo={studyInfo}
            totalTask={totalTask}
            expiredTaskCount={expiredTaskCount}
            memberProgressArr={memberProgressArr}
            selectedId={selectedId}
          />
        </section>
        <section css={taskSection}>
          <TaskBox
            studyInfo={studyInfo}
            studyId={studyId}
            setSelectedId={setSelectedId}
          />
        </section>
      </div>
      <Footer />
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
  max-width: 1100px;
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
  height: auto;
`;

const taskSection = css`
  margin-top: 24px;
`;
