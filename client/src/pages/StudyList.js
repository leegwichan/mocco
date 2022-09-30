import React, { useEffect, useMemo, useRef, useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import SearchBar from '../components/PageComponent/StudyList/SearchBar';
import StudyCard from '../components/PageComponent/StudyList/StudyCard';
import MakeStudyButton from '../components/PageComponent/StudyList/MakeStudyButton';
import StudyListTitle from '../components/PageComponent/StudyList/StudyListTitle';
import request from '../api/index';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Common/Footer';

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

const LastListAlert = css`
  position: relative;
  width: 100%;
  height: 4rem;
  text-align: center;
  font-size: 1.5rem;
`;

function getSearchQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function StudyList() {
  const [studyLists, setStudyLists] = useState([]);
  const [apiPage, setApiPage] = useState(1);
  const [isLastList, setIsLastList] = useState(false);
  const [searchContent, setSearchContent] = useState(
    getSearchQuery().get('search')
  );

  useEffect(() => {
    getStudyLists();
  }, [searchContent]);

  useEffect(() => {
    obeserverRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && obeserverRef.current.observe(boxRef.current);
  }, [studyLists]);

  const getStudyLists = () => {
    if (searchContent === null) {
      request(`/api/study-info/board?page=${apiPage}&size=20`)
        .then((res) => {
          if (res.data.pageInfo.totalPages < apiPage) {
            setIsLastList(true);
            return;
          } else {
            setStudyLists([...studyLists, ...res.data.data]);
            setApiPage(apiPage + 1);
          }
        })
        .catch((err) => console.log(err));
    } else {
      request(
        `/api/study-info/search?page=${apiPage}&size=20&query=${searchContent}`
      )
        .then((res) => {
          if (res.data.pageInfo.totalPages < apiPage) {
            setIsLastList(true);
            return;
          } else {
            setStudyLists([...studyLists, ...res.data.data]);
            setApiPage(apiPage + 1);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const obeserverRef = useRef();
  const boxRef = useRef(null);

  const intersectionObserver = (entries, io) => {
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
          <div>
            <div css={ContentContainer}>
              <section css={TitleAndButtonContainer}>
                <StudyListTitle />
                <MakeStudyButton />
              </section>
              <section css={SearchContainer}>
                <SearchBar
                  searchContent={searchContent}
                  setSearchContent={setSearchContent}
                  setStudyLists={setStudyLists}
                  setApiPage={setApiPage}
                />
              </section>
              <section>
                <ul css={StudyCardContainer}>
                  {studyLists.map((studyData, i) => {
                    if (studyLists.length - 4 === i) {
                      return (
                        <StudyCard
                          key={i}
                          studyData={studyData}
                          boxRef={boxRef}
                        />
                      );
                    } else {
                      return <StudyCard key={i} studyData={studyData} />;
                    }
                  })}
                </ul>
              </section>
            </div>
            {isLastList ? (
              <>
                <div css={LastListAlert}>더 이상 불러올 내용이 없습니다.</div>
                <Footer />
              </>
            ) : null}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
}

export default StudyList;
