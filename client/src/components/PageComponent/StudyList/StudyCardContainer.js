import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import StudyCard from './StudyCard';

function StudyCardContainer() {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
      `}
    >
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
      <StudyCard />
    </div>
  );
}

export default StudyCardContainer;
