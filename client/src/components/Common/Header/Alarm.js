import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../atom/atom';

function Alarm({ alarm, handleDeleteAlarm, isLink }) {
  const { memberId } = useRecoilValue(userInfoState);

  console.log(alarm);
  if (isLink) {
    return (
      <li
        css={css`
          position: relative;
          padding: 0.5rem;
          background-color: white;
          border-bottom: 1px solid #999999;
        `}
      >
        <button
          onClick={() => handleDeleteAlarm(alarm.alarmId)}
          css={css`
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            border: none;
            background: none;
            font-weight: bold;
            color: #999999;
            &:hover {
              color: #0b6ff2;
            }
          `}
        >
          X
        </button>
        <Link
          to={
            alarm.alarmType === 'STUDY_ENTER'
              ? `/studylist/detail/${alarm.study.studyId}`
              : `/studyboard/${alarm.alarmId}/${memberId}`
          }
          css={css`
            color: black;
            text-decoration: none;
          `}
        >
          <div
            css={css`
              margin-bottom: 0.5rem;
            `}
          >
            {alarm.study.teamName}
          </div>
          <div>{alarm.content}</div>
          <div
            css={css`
              text-align: right;
              font-size: 0.8rem;
            `}
          >
            {alarm.createdAt}
          </div>
        </Link>
      </li>
    );
  } else {
    return (
      <li
        css={css`
          position: relative;
          padding: 0.5rem;
          background-color: white;
          border-bottom: 1px solid #999999;
        `}
      >
        <button
          onClick={() => handleDeleteAlarm(alarm.alarmId)}
          css={css`
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            border: none;
            background: none;
            font-weight: bold;
            color: #999999;
            &:hover {
              color: #0b6ff2;
            }
          `}
        >
          X
        </button>
        <div
          css={css`
            margin-bottom: 0.5rem;
          `}
        >
          개설되지 못한 스터디
        </div>
        <div>{alarm.content}</div>
        <div
          css={css`
            text-align: right;
            font-size: 0.8rem;
          `}
        >
          {alarm.createdAt}
        </div>
      </li>
    );
  }
}

export default Alarm;
