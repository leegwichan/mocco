import { css } from '@emotion/react';
import StudySection from '../components/PageComponent/StudyListDetail/StudySection';
import TabSection from '../components/PageComponent/StudyListDetail/TabSection';
import request from '../api/index';

function StudyListDetail() {
  request('/api/study-info/board/1').then((res) => console.log(res.data.data));

  return (
    <div
      css={css`
        max-width: 1200px;
        margin: auto;
        margin-top: 170px;
      `}
    >
      <StudySection />
      <TabSection />
    </div>
  );
}

export default StudyListDetail;
