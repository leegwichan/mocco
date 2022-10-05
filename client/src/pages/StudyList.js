import React, { useEffect, useMemo, useRef, useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import SearchBar from '../components/PageComponent/StudyList/SearchBar';
import StudyCard from '../components/PageComponent/StudyList/StudyCard';
import MakeStudyButton from '../components/PageComponent/StudyList/MakeStudyButton';
import StudyListTitle from '../components/PageComponent/StudyList/StudyListTitle';
import request from '../api/index';
import { useLocation } from 'react-router-dom';

const MainContainer = css`
  width: 100vw;
  min-height: calc(100vh - 4rem);
  padding-top: 8rem;
`;

const ContentContainer = css`
  max-width: 1260px;
  margin: auto;
  padding: 0 2rem;
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
  /* justify-content: space-between; */
  flex-wrap: wrap;
  gap: 0 6.66%;

  @media (max-width: 1200px) {
    gap: 0 5%;
  }
`;

const LastListAlert = css`
  position: relative;
  width: 100%;
  height: 4rem;
  text-align: center;
  font-size: 1.5rem;
`;

// URI의 쿼리 찾는 함수
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

  // 검색어 변경시 스터디리스트 받아옴
  useEffect(() => {
    getStudyLists();
  }, [searchContent]);

  const observerRef = useRef();
  const boxRef = useRef(null);

  // 관측요소가 관측된다면 관측요소의 관측 취소하고 스터디리스트를 새로 받아옴
  const intersectionObserver = (entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        getStudyLists();
      }
    });
  };

  // 스터디리스트가 바뀌면 즉 추가 로딩이 있으면 IntersectionObserver의 관측 요소 변경
  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [studyLists]);

  // 스터디 리스트 받아오기 : 검색어 없을때 / 검색어 있을때
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

  return (
    <>
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
