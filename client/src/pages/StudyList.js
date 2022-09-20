import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import SearchBar from '../components/PageComponent/StudyList/SearchBar';
import StudyCard from '../components/PageComponent/StudyList/StudyCard';
import MakeStudyButton from '../components/PageComponent/StudyList/MakeStudyButton';
import StudyListTitle from '../components/PageComponent/StudyList/StudyListTitle';

const Header = css`
  width: 100vw;
  height: 4rem;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MainContainer = css`
  width: 100vw;
  height: calc(100vh - 64px);
  padding-top: 60px;
`;

const ContentContainer = css`
  max-width: 1200px;
  margin: auto;
`;

const TitleAndButtonContainer = css`
  display: flex;
  width: 100%;
  margin-bottom: 60px;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = css`
  position: relative;
  margin-bottom: 60px;
`;

const StudyCardContainer = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function StudyList() {
  return (
    <>
      <header css={Header} />
      <main css={MainContainer}>
        <div css={ContentContainer}>
          <section css={TitleAndButtonContainer}>
            <StudyListTitle />
            <MakeStudyButton />
          </section>
          <section css={SearchContainer}>
            <SearchBar />
          </section>
          <section css={StudyCardContainer}>
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
          </section>
        </div>
      </main>
    </>
  );
}

export default StudyList;
