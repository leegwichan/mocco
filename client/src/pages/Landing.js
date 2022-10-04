import { css } from '@emotion/react';

const MainContainer = css`
  width: 100vw;
  padding-top: 8rem;
  .second {
    background-color: #f0f8ff;
  }
  .contentsContainer {
    width: 90vw;
    max-width: 1260px;
    height: 90%;
    border: 2px solid red;
    display: flex;
    justify-content: space-around;
  }
`;

const seciton = css`
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Landing() {
  return (
    <div css={MainContainer}>
      <section css={seciton}>
        <div className="contentsContainer">
          <div>이미지</div>
          <div>글</div>
        </div>
      </section>
      <section css={seciton} className="second">
        <div className="contentsContainer">2</div>
      </section>
      <section css={seciton}>
        <div className="contentsContainer">3</div>
      </section>
    </div>
  );
}

export default Landing;
