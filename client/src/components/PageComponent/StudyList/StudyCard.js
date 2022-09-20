import { css } from '@emotion/react';

function StudyCard() {
  return (
    <div
      css={css`
        width: 250px;
        height: 250px;
        margin-bottom: 4rem;
        border-radius: 10px;
        box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
        transition: all 0.1s linear;
        &:hover {
          transform: translateY(-1rem);
        }
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 60%;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        `}
      >
        <img
          src="https://avatars.githubusercontent.com/u/71388830?v=4"
          alt="스터디 대표 사진"
        />
      </div>
      <div
        css={css`
          display: flex;
          height: 40%;
          padding: 0 1rem;
          flex-direction: column;
          justify-content: space-around;
        `}
      >
        <div
          css={css`
            font-size: 1.2rem;
          `}
        >
          한 달 동안 모딥다 마스터하는 스터디입니다...
        </div>
        <hr
          css={css`
            border: 0;
            height: 1px;
            background: #d1d1d1;
          `}
        />
        <div
          css={css`
            display: flex;

            justify-content: space-between;
            font-size: 0.8rem;
          `}
        >
          <span>스터디 이름</span>
          <span>정원 n명</span>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
