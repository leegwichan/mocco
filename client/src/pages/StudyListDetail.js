import { css } from '@emotion/react';
import StudySection from '../components/PageComponent/StudyListDetail/StudySection/StudySection';
import TabSection from '../components/PageComponent/StudyListDetail/TabSection';

function StudyListDetail() {
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
