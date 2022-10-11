import { css } from '@emotion/react';
import React from 'react'; // eslint-disable-line no-unused-vars
import StudyCard from './StudyCard';

const Container = css`
  flex-wrap: wrap;
  height: auto;
  ul {
    display: flex;
    flex-direction: row;
    max-width: 1000px;
    align-items: flex-start;
    padding: 2.5vw;
    gap: 4%;
  }
  @media all and (max-width: 1165px) {
    height: 100%;
    padding: 0vw;
    width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 1000px;
      padding: 4%;
    }
  }
`;

function ShortListSection(studyArr) {
  return (
    <div css={Container}>
      <ul>
        {studyArr &&
          studyArr.progress === 'progress' &&
          studyArr.studyArr.map((studyData, idx) => (
            <li
              key={idx}
              role="presentation"
              onClick={() => studyArr.clickFunc(studyData)}
            >
              <StudyCard studyData={studyData} />
            </li>
          ))}
        {studyArr &&
          studyArr.done === 'done' &&
          studyArr.studyArr.map((studyData, idx) => (
            <li key={idx} role="presentation">
              <StudyCard studyData={studyData} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ShortListSection;
