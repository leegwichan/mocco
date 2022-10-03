import { css } from '@emotion/react';
import StudySection from '../components/PageComponent/StudyListDetail/StudySection';
import TabSection from '../components/PageComponent/StudyListDetail/TabSection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import request from '../api';
import { singleStudyState } from '../atom/atom';
import { useSetRecoilState } from 'recoil';
import Footer from '../components/Common/Footer';

function StudyListDetail() {
  const { id } = useParams();
  const setStudyInfo = useSetRecoilState(singleStudyState);

  const getStudyInfo = () => {
    request(`/api/study-info/board/${id}`)
      .then((res) => {
        // console.log('나는 전체 데이터', res);
        setStudyInfo(res.data.data);
        // console.log(studyInfo);
        // console.log(res.data.data.member.nickname);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudyInfo();
  }, [id]);

  return (
    <main css={container}>
      <div css={mainContainer}>
        <StudySection id={id} />
        <TabSection />
      </div>
      <Footer />
    </main>
  );
}

export default StudyListDetail;

const container = css`
  width: 100vw;
  height: calc(100vh - 64px);
  padding-top: 100px;
`;

const mainContainer = css`
  max-width: 1260px;
  padding: 0 2rem;
  margin: auto;
`;
