import React, { useEffect, useRef, useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import SearchBar from '../components/PageComponent/StudyList/SearchBar';
import StudyCard from '../components/PageComponent/StudyList/StudyCard';
import MakeStudyButton from '../components/PageComponent/StudyList/MakeStudyButton';
import StudyListTitle from '../components/PageComponent/StudyList/StudyListTitle';
import request from '../api/index';

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
  const [studyLists, setStudyLists] = useState([]);
  const [apiPage, setApiPage] = useState(1);
  const getStudyLists = () => {
    request(`/api/study-info/board?page=${apiPage}&size=20`).then((res) => {
      console.log(res.data.pageInfo.totalPages);
      if (res.data.pageInfo.totalPages === apiPage) {
        return;
      } else {
        setStudyLists([...studyLists, ...res.data.data]);
        setApiPage(apiPage + 1);
      }
    });
  };

  const obeserverRef = useRef();
  const boxRef = useRef(null);

  useEffect(() => {
    getStudyLists();
  }, []);

  useEffect(() => {
    obeserverRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && obeserverRef.current.observe(boxRef.current);
  }, [studyLists]);

  const intersectionObserver = (entries, io) => {
    console.log(entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        getStudyLists();
      }
    });
  };
  return (
    <>
      <header css={Header} />
      <main css={MainContainer}>
        {studyLists ? (
          <div css={ContentContainer}>
            <section css={TitleAndButtonContainer}>
              <StudyListTitle />
              <MakeStudyButton />
            </section>
            <section css={SearchContainer}>
              <SearchBar />
            </section>
            <section css={StudyCardContainer}>
              {/* {studyLists.map((studyData, i) => {
                return <StudyCard key={i} studyData={studyData} />;
              })} */}
              {studyLists.map((studyData, i) => {
                if (studyLists.length - 4 === i) {
                  return (
                    <StudyCard key={i} studyData={studyData} boxRef={boxRef} />
                  );
                } else {
                  return <StudyCard key={i} studyData={studyData} />;
                }
              })}
            </section>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
}

export default StudyList;
