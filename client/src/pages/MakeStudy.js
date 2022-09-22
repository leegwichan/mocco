import React, { useRef } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const Header = css`
  width: 100vw;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MainContainer = css`
  width: 100vw;
  height: calc(100vh - 64px);
  padding-top: 60px;
`;

const ContentContainer = css`
  max-width: 1200px;
  margin: 0 auto;
`;

const MakeStudyTitle = css`
  font-size: 2.5rem;
  margin-bottom: 60px;
`;

const StudyDetailContainer = css`
  display: flex;
  width: 100%;
  background-color: whitesmoke;
`;

const StudyDetailLeft = css`
  display: inline-flex;
  width: 45%;
  margin-right: 5%;
  flex-direction: column;
`;

const StudyDetailRight = css`
  display: inline-flex;
  width: 45%;
  margin-left: 5%;
  flex-direction: column;
`;

const Label = css`
  display: block;
  margin: 1rem 0;
  font-size: 1.1rem;
`;

const InputLeft = css`
  width: 100%;
  height: 45px;
  padding: 0 0.5rem;
  border: 1px solid #999999;
  border-radius: 5px;
  font-size: 1.2rem;
`;

const SummaryContainer = css`
  flex: 4 0;
`;

const PhotoContainer = css`
  flex: 6 0;
`;

const SummaryTextArea = css`
  width: 100%;
  height: calc(100% - 55px);
  padding: 0.5rem;
  border: 1px solid #999999;
  border-radius: 5px;
  font-size: 1.3rem;
  resize: none;
`;

// const Photo = css``;

function MakeStudy() {
  return (
    <>
      <header css={Header}></header>
      <main css={MainContainer}>
        <div css={ContentContainer}>
          <section css={MakeStudyTitle}>
            <h1>스터디 공고 작성하기</h1>
          </section>
          <section>
            <form action="submit">
              {/* 스터디 소개 위쪽 */}
              <div css={StudyDetailContainer}>
                <div css={StudyDetailLeft}>
                  <div>
                    <label htmlFor="studyName" css={Label}>
                      스터디 이름
                    </label>
                    <input
                      type="text"
                      name="studyName"
                      placeholder="ex) 모코모코"
                      css={InputLeft}
                    />
                  </div>
                  <div>
                    <label htmlFor="studyCapacity" css={Label}>
                      스터디 정원
                    </label>
                    <input
                      type="text"
                      name="studyCapacity"
                      placeholder="ex) 5명"
                      css={InputLeft}
                    />
                  </div>
                  <div>
                    <label htmlFor="studyStart" css={Label}>
                      스터디 시작일
                    </label>
                    <input type="date" name="studyStart" css={InputLeft} />
                  </div>
                  <div>
                    <label htmlFor="studyEnd" css={Label}>
                      스터디 만료일
                    </label>
                    <input type="date" name="studyEnd" css={InputLeft} />
                  </div>
                </div>
                <div css={StudyDetailRight}>
                  <div css={SummaryContainer}>
                    <label htmlFor="summary" css={Label}>
                      스터디 요약글
                    </label>
                    <textarea
                      type="text"
                      name="summary"
                      placeholder="ex) React 기초를 다지는 스터디입니다."
                      css={SummaryTextArea}
                    />
                  </div>
                  <div css={PhotoContainer}>
                    <label htmlFor="studyPhoto" css={Label}>
                      스터디 대표 사진
                    </label>
                    <input
                      type="file"
                      name="studyPhoto"
                      accept="image/png,image/jpg"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="introduce">스터디 소개</label>
                <input type="text" name="introduce" />
              </div>
              <div>
                <label htmlFor="rules">스터디 규칙</label>
                <input type="text" name="rules" />
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default MakeStudy;
