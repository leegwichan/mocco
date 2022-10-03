import React from 'react'; // eslint-disable-line no-unused-vars
import ProgressBar from './ProgressBar';
import { css } from '@emotion/react';

const Total = css`
  width: 1100px;
  height: 405px;
  background-image: url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcknW7m%2FbtrNb75XO4z%2FKbr8eYQxxKLwvSKBz8z6rk%2Fimg.png');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CounterContainer = css`
  width: 990px;
  position: absolute;
  margin-left: 60px;
  .inner {
    width: 940px;
    display: flex;
  }
  .number {
    width: 940px;
    display: flex;
    height: 20px;
    position: relative;
    margin-left: 13px;
    margin-bottom: 20px;
    .numberRight {
      display: flex;
      justify-content: flex-end;
      width: 100%;
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
  padding-top: 190px;
`;

function ProgressSection({
  studyInfo,
  totalTask,
  expiredTaskCount,
  memberProgressArr,
  selectedId,
}) {
  console.log(memberProgressArr);
  return (
    <div css={Total}>
      <div css={CounterContainer}>
        {studyInfo.taskList && (
          <div className="number">
            {studyInfo.taskList.map((el, idx) => (
              <div key={el.taskId} className="numberRight">
                <div css={CountNumber}>{idx + 1}</div>
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
