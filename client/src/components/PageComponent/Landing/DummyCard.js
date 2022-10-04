import { css } from '@emotion/react';

const Card = css`
  background-color: white;
  width: 220px;
  height: 220px;
  border-radius: 10px;
  box-shadow: 4px 8px 5px -2px rgb(0 0 0 /25%);
  transition: all 0.1s linear;
  &:hover {
    transform: translateY(-1rem);
  }
`;

const ImageContainer = css`
  width: 100%;
  height: 60%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
`;

const Content = css`
  display: flex;
  height: 40%;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: space-around;
`;

const Summary = css`
  font-size: 1rem;
  font-weight: 600;
`;

const DivideLine = css`
  border: 0;
  height: 1px;
  background: #d1d1d1;
`;

const NameAndCapacity = css`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

function DummyCard({ summary, src, teamName, capacity }) {
  return (
    <div css={Card}>
      <div css={ImageContainer}>
        <img src={src} alt="스터디 대표 사진" />
      </div>
      <div css={Content}>
        <div css={Summary}>{summary}</div>
        <hr css={DivideLine} />
        <div css={NameAndCapacity}>
          <span>{teamName}</span>
          <span>정원 {capacity}명</span>
        </div>
      </div>
    </div>
  );
}

export default DummyCard;
