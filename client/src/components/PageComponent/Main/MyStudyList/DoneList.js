import { css } from '@emotion/react';

// import StudyCard from './StudyCard';

const Empty = css`
  height: 252px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #2d2d2d;
  svg {
    width: 75px;
    margin-bottom: 5px;
    color: #0f6ad5;
  }
`;

function DoneList({ studyList }) {
  if (studyList) {
    console.log(studyList.length);
  }

  return (
    <div>
      {studyList && studyList.length < 1 ? (
        <div css={Empty}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span>완료된 스터디가 없습니다</span>
        </div>
      ) : (
        <div>있음</div>
      )}
    </div>
  );
}
export default DoneList;
