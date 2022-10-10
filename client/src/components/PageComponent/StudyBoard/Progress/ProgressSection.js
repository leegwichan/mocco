import React from 'react'; // eslint-disable-line no-unused-vars
import ProgressBar from './ProgressBar';
import { css } from '@emotion/react';
import 모꼬배경 from '../../../../asset/모꼬배경.png';
// import 깃발 from '../../../../asset/깃발.png';

const Total = css`
  height: 405px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 767px) {
    display: none;
  }
`;
const CounterContainer = css`
  width: 80vw;
  max-width: 1000px;
  position: absolute;
  margin-left: 60px;
  .inner {
    width: 75vw;
    max-width: 950px;
    display: flex;
  }
  .number {
    width: 75vw;
    max-width: 950px;
    display: flex;
    height: 20px;
    position: relative;
    margin-left: 14px;
    margin-bottom: 15px;
    .numberRight {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      :first-of-type {
        position: absolute;
        right: 99%;
        width: 93px;
        height: 29.1px;
        justify-content: center;
        font-weight: 700;
        color: white;
        background-color: #0b6ff2;
        font-size: 20px;
        line-height: 27px;
        box-shadow: -2px 1px 1px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
      }
      svg {
        position: absolute;
        top: -15px;
        right: -22px;
        width: 30px;
        fill: #0b6ff2;
        filter: drop-shadow(-4px 2px 1px rgba(0, 0, 0, 0.2));
      }
    }
  }
`;

const CountNumber = css`
  background-color: #a2e6ff;
  border-radius: 50%;
  width: 27px;
  height: 27px;
  display: flex;
  flex-direction: column;
  padding-bottom: 2px;
  justify-content: center;
  font-size: small;
  color: rgba(67, 145, 249, 1);
  box-shadow: -2px 1px 1px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  text-align: center;
`;

const CountSectionBox = css`
  border-right: 1px dashed rgba(153, 153, 153, 0.75);
  width: 100%;
  height: 320px;
`;

const BarSection = css`
  position: relative;
  padding-top: 200px;

  @media all and (max-width: 1023px) {
    padding-top: 220px;
  }
`;

function ProgressSection({
  studyInfo,
  totalTask,
  expiredTaskCount,
  memberProgressArr,
  selectedId,
}) {
  return (
    <div css={Total} style={{ backgroundImage: `url(${모꼬배경})` }}>
      <div css={CounterContainer}>
        {studyInfo.taskList && (
          <div className="number">
            <div className="numberRight">START!</div>
            {studyInfo.taskList.map((el, idx) => (
              <div key={el.taskId} className="numberRight">
                <div css={CountNumber}>{idx + 1}</div>
                {studyInfo.taskList.length === idx + 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    transform="rotate(30)"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#0b6ff2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                    />
                  </svg>
                ) : null}
              </div>
            ))}
          </div>
        )}

        {studyInfo.taskList && (
          <div className="inner">
            {studyInfo.taskList.map((el) => (
              <div key={el.taskId} css={CountSectionBox}></div>
            ))}
          </div>
        )}
      </div>
      <section css={BarSection}>
        <ProgressBar
          who={'mocco'}
          totalTask={totalTask}
          endTask={expiredTaskCount}
        />
        {memberProgressArr && (
          <ul>
            {memberProgressArr.map((item) => (
              <li
                key={item.memberId}
                css={css`
                  list-style: none;
                `}
              >
                <ProgressBar
                  item={item}
                  endTask={item.endTaskCount}
                  characterMemberId={item.memberId}
                  who={'character'}
                  totalTask={totalTask}
                  mocco={expiredTaskCount}
                  selectedId={selectedId}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ProgressSection;
