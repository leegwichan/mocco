import { css } from '@emotion/react';
import StudySection from '../components/PageComponent/StudyListDetail/StudySection';
// import request from '../api/index';

function StudyListDetail() {
  return (
    <div
      css={css`
        max-width: 1200px;
        margin: auto;
        margin-top: 170px;
        border: 1px solid red;
      `}
    >
      <StudySection />
    </div>
  );
}

export default StudyListDetail;
