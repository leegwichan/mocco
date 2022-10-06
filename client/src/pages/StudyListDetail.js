import { css } from '@emotion/react';
import StudySection from '../components/PageComponent/StudyListDetail/StudySection';
import TabSection from '../components/PageComponent/StudyListDetail/TabSection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import request from '../api';
import { singleStudyState } from '../atom/atom';
import { useSetRecoilState } from 'recoil';

function StudyListDetail() {
  const { id } = useParams();
  const setStudyInfo = useSetRecoilState(singleStudyState);

  const getStudyInfo = () => {
    request(`/api/study-info/board/${id}`)
      .then((res) => {
        setStudyInfo(res.data.data);
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
    </main>
  );
}

export default StudyListDetail;

const container = css`
  width: 100vw;
  padding-top: 8rem;
`;

const mainContainer = css`
  max-width: calc(1200px + 4rem);
  padding: 0 2rem;
  margin: auto;
`;
