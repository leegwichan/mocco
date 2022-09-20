import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import SearchBar from '../components/PageComponent/StudyList/SearchBar';
import StudyCardContainer from '../components/PageComponent/StudyList/StudyCardContainer';
import MakeStudyButton from '../components/PageComponent/StudyList/MakeStudyButton';
import StudyListTitle from '../components/PageComponent/StudyList/StudyListTitle';

function StudyList() {
  return (
    <>
      <header
        css={css`
          width: 100vw;
          height: 4rem;
          background-color: rgba(0, 0, 0, 0.5);
        `}
      ></header>
      <div
        css={css`
          width: 100vw;
          height: calc(100vh - 64px);
          padding-top: 60px;
        `}
      >
        <div
          css={css`
            max-width: 1200px;
            margin: auto;
          `}
        >
          <div
            css={css`
              display: flex;
              width: 100%;
              margin-bottom: 60px;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <StudyListTitle />
            <MakeStudyButton />
          </div>
          <div
            css={css`
              position: relative;
              margin-bottom: 60px;
            `}
          >
            <SearchBar />
          </div>
          <StudyCardContainer />
        </div>
      </div>
    </>
  );
}

export default StudyList;
