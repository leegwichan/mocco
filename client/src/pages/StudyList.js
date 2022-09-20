import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import StudyCard from '../components/PageComponent/StudyList/StudyCard';

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
            height: calc(100vh-64px);
            margin: auto;
          `}
        >
          {/* h1, 스터디 만들기 button 컨테이너 */}
          <div
            css={css`
              display: flex;
              width: 100%;
              margin-bottom: 60px;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <h1
              css={css`
                display: inline-block;
                font-size: 2.5rem;
              `}
            >
              모집중인 스터디
            </h1>
            <button
              css={css`
                width: 120px;
                height: 40px;
                font-size: 18px;
                color: white;
                border: none;
                border-radius: 8px;
                background-color: #0b6ff2;
                transition: all 0.1s linear;
                &:hover {
                  color: #0b6ff2;
                  border: 1px solid #0b6ff2;
                  background-color: white;
                }
              `}
            >
              스터디 만들기
            </button>
          </div>
          {/* input 컨테이너 */}
          <div
            css={css`
              position: relative;
              margin-bottom: 60px;
            `}
          >
            <input
              type="text"
              css={css`
                width: 100%;
                height: 40px;
                padding: 0 20px;
                font-size: 20px;
                border: 1px solid #4391f9;
                border-radius: 30px;
                background-color: #f0f8ff;
              `}
              placeholder={`원하는 스터디를 검색해 주세요.`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              css={css`
                position: absolute;
                width: 30px;
                height: 30px;
                top: 5px;
                right: 20px;
              `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          {/* 스터디 카드 컨테이너 */}
          <div
            css={css`
              display: flex;
              width: 100%;
              justify-content: space-between;
              flex-wrap: wrap;
            `}
          >
            {/* card가 flex로 배치됨 */}
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
        </div>
      </div>
    </>
  );
}

export default StudyList;
