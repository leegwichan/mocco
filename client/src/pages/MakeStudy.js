import React, { useCallback, useRef } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import request from '../api/index';

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
  margin-bottom: 30px;
`;

const StudyDetailContainer = css`
  display: flex;
  width: 100%;
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

const FileInput = css`
  display: none;
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

const IntroduceAndRulesContainer = css`
  width: 100%;
  margin: 60px 0;
`;

const BigLabel = css`
  display: inline-block;
  border-bottom: 3px solid #0b6ff2;
  font-size: 2rem;
`;

const BigTextArea = css`
  display: block;
  width: 100%;
  height: 250px;
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #999999;
  border-radius: 5px;
  font-size: 1.3rem;
  resize: none;
`;

function MakeStudy() {
  const fileInputRef = useRef();
  const imageRef = useRef();

  // input 파일 변경시 서버에 이미지 파일 전송
  const handleChange = useCallback((e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    request
      .post('/api/study-board/image?file-size=251722', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => (imageRef.current.src = res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // 이미지 업로드 버튼 클릭 시 input 대신 클릭되게 설정
  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.click();
  }, []);
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
                      ref={fileInputRef}
                      css={FileInput}
                      onChange={handleChange}
                    />
                    <div
                      css={css`
                        position: relative;
                        width: 100%;
                        height: 208px;
                        overflow: hidden;
                      `}
                    >
                      <img
                        src="https://avatars.githubusercontent.com/u/71388830?v=4"
                        alt="profile_image"
                        ref={imageRef}
                        css={css`
                          width: 100%;
                          height: 100%;
                          border-radius: 5px 5px 0 0;
                        `}
                      />
                      <button
                        onClick={handleClick}
                        css={css`
                          position: absolute;
                          width: 100%;
                          height: 40px;
                          bottom: 0;
                          left: 0;
                          font-size: 1.2rem;
                          color: white;
                          border: none;
                          border-radius: 0 0 5px 5px;
                          background-color: #0b6ff2;
                        `}
                      >
                        이미지 업로드
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div css={IntroduceAndRulesContainer}>
                <div>
                  <label htmlFor="introduce" css={BigLabel}>
                    스터디 소개
                  </label>
                  <textarea type="text" name="introduce" css={BigTextArea} />
                </div>
                <div>
                  <label htmlFor="rules" css={BigLabel}>
                    스터디 규칙
                  </label>
                  <textarea type="text" name="rules" css={BigTextArea} />
                </div>
              </div>
              <div
                css={css`
                  margin-top: 30px;
                  margin-bottom: 120px;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    margin-bottom: 2rem;
                    justify-content: space-between;
                    align-items: center;
                  `}
                >
                  <div css={BigLabel}>스터디 TASK</div>
                  <button
                    css={css`
                      height: 40px;
                      padding: 0 1rem;
                      color: white;
                      font-size: 1.1rem;
                      border: none;
                      border-radius: 8px;
                      background-color: #0b6ff2;
                      transition: all 0.1s linear;
                      &:hover {
                        color: #0b6ff2;
                        background-color: white;
                        border: 1px solid #0b6ff2;
                      }
                    `}
                  >
                    TASK 추가하기
                  </button>
                </div>
                {/* Task 목록 */}
                <ul>
                  <li
                    css={css`
                      display: flex;
                    `}
                  >
                    <div
                      css={css`
                        display: flex;
                        margin-right: 0.5rem;
                        align-items: flex-start;
                      `}
                    >
                      <button
                        css={css`
                          font-size: 20px;
                          line-height: 40px;
                          border: none;
                          background-color: white;
                        `}
                      >
                        ❌
                      </button>
                    </div>
                    <div
                      css={css`
                        display: inline-block;
                        height: 100%;
                        margin-right: 1rem;
                      `}
                    >
                      <span
                        css={css`
                          color: #0b7ff2;
                          font-size: 40px;
                        `}
                      >
                        Task 1
                      </span>
                    </div>
                    <div
                      css={css`
                        display: inline-block;
                        flex: 1 0;
                      `}
                    >
                      <input
                        type="text"
                        css={css`
                          display: block;
                          width: 100%;
                          height: 45px;
                          margin-bottom: 10px;
                          padding: 0 1rem;
                          font-size: 1.2rem;
                          border: 1px solid #999999;
                          border-radius: 5px;
                        `}
                      />
                      <input
                        type="date"
                        css={css`
                          display: block;
                          height: 44px;
                          margin-top: 10px;
                          padding: 0 1rem;
                          font-size: 1.2rem;
                          border: 1px solid #999999;
                          border-radius: 5px;
                        `}
                      />
                    </div>
                  </li>
                </ul>
              </div>
              <div
                css={css`
                  text-align: right;
                `}
              >
                <button
                  css={css`
                    height: 40px;
                    margin-right: 1rem;
                    padding: 0 1rem;
                    color: white;
                    font-size: 1.1rem;
                    border: none;
                    border-radius: 8px;
                    background-color: #999999;
                    transition: all 0.1s linear;
                    &:hover {
                      color: #999999;
                      background-color: white;
                      border: 1px solid #999999;
                    }
                  `}
                >
                  취소
                </button>
                <button
                  css={css`
                    height: 40px;
                    padding: 0 1rem;
                    color: white;
                    font-size: 1.1rem;
                    border: none;
                    border-radius: 8px;
                    background-color: #0b6ff2;
                    transition: all 0.1s linear;
                    &:hover {
                      color: #0b6ff2;
                      background-color: white;
                      border: 1px solid #0b6ff2;
                    }
                  `}
                >
                  스터디 만들기
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default MakeStudy;
