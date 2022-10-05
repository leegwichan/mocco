import { css } from '@emotion/react';

const Card = css`
  background-color: white;
  width: 220px;
  height: 220px;
  border-radius: 10px;
  box-shadow: 4px 8px 5px -2px rgb(0 0 0 /25%);
  transition: all 0.1s linear;
  position: relative;
  &:hover {
    transform: translateY(-1rem);
  }
  .tag {
    font-weight: 700;
    font-size: 1rem;
    color: #0f6ad4;
    position: absolute;
    top: -1.6rem;
  }
  @media all and (max-width: 1023px) {
    width: 22vw;
    height: 22vw;
    border-radius: 5px;
    .tag {
      font-weight: 600;
      font-size: 0.5rem;
      top: -1rem;
    }
  }
  @media all and (max-width: 767px) {
    width: 20vw;
    min-width: 115px;
    height: 25vw;
    min-height: 142px;
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
  @media all and (max-width: 767px) {
    padding: 0 0.2rem;
    margin-top: -0.5rem;
  }
`;

const Summary = css`
  font-size: 1rem;
  font-weight: 600;
  @media all and (max-width: 1023px) {
    font-size: 12px;
  }
  @media all and (max-width: 767px) {
    font-size: 2px;
  }
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
  @media all and (max-width: 1023px) {
    font-size: 5px;
  }
`;

function DummyCard({ summary, src, teamName, capacity, hashTag }) {
  return (
    <div>
      <div css={Card}>
        <div className="tag">{hashTag}</div>

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
    </div>
  );
}

export default DummyCard;
