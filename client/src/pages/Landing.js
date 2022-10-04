import { css } from '@emotion/react';
import 랜딩모바일 from '../asset/랜딩모바일.png';
import DummyCard from '../components/PageComponent/Landing/DummyCard';
import 스터디사진1 from '../asset/스터디사진1.png';
import 스터디사진2 from '../asset/스터디사진2.png';

const MainContainer = css`
  width: 100vw;
  padding-top: 4rem;
  .section {
    width: 100vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .second {
    background-color: #f0f8ff;
  }
  .contentsContainer {
    width: 90vw;
    max-width: calc(1200px + 4rem);
    padding: 0px 2rem;
    height: 90%;
    display: flex;
    justify-content: space-between;
  }

  .imgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px -5px 0px 40px;
  }
`;

const first = css`
  img {
    width: 30vw;
    max-width: 272px;
  }

  .progress {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 100px;
    .firstTxt {
      font-weight: 600;
      font-size: 45px;
      line-height: 58px;
      color: #000000;
      @media all and (max-width: 1023px) {
        font-size: 4vw;
      }
    }
    .progressContainer {
      width: 40vw;
      max-width: 530px;
      height: 4vw;
      max-height: 34px;
      background: #fffefe;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      display: flex;
      align-items: center;
      span {
        font-weight: 600;
        font-size: 17px;
        line-height: 27px;
        color: #0f6ad5;
        text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
        margin-left: 4%;
        @media all and (max-width: 767px) {
          font-size: 2vw;
        }
      }
    }
    .bar {
      width: 30vw;
      max-width: 400px;
      height: 4vw;
      max-height: 34px;
      background: #0f6ad5;
      border-radius: 10px;
    }
  }
`;

const second = css`
  display: flex;
  align-items: center;
  .midTxt {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 4%;
  }
  .smallTxt {
    margin-bottom: 10%;
    p {
      font-size: 15px;
    }
  }
  button {
    background: #0f6ad4;
    cursor: pointer;
    border-radius: 8px;
    width: 170px;
    padding: 10px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
    border: none;
  }
  .secondLeft {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .cards {
    height: 90%;
    display: flex;
    justify-content: center;
    .secondCard {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      margin-left: 20px;
    }
    .tag {
      font-weight: 700;
      font-size: 15px;
      color: #0f6ad4;
    }
  }
`;

const third = css``;

function Landing() {
  return (
    <div css={MainContainer}>
      <section className="section">
        <div css={first} className="contentsContainer">
          <div className="imgContainer">
            <img src={랜딩모바일} alt="스마트폰실사용 화면"></img>
          </div>
          <div className="progress">
            <span className="firstTxt">
              <p>언제 어디서나</p>
              <p>모꼬와 함께 온라인 스터디</p>
            </span>
            <div className="progressContainer">
              <div className="bar"></div>
              <span>70%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="second section">
        <div css={second} className="contentsContainer">
          <div className="secondLeft">
            <div className="midTxt">
              <p>이젠 혼자 코딩하지 마세요</p>
              <p>원하는 스터디에 참여하세요</p>
            </div>
            <div className="smallTxt">
              <p>모코에서는 현재 100개의 스터디가 모집중이고</p>
              <p>30개의 스터디가 진행중이에요</p>
              <p>모코에서 함께 공부할 스터디 친구를 만나보세요</p>
            </div>
            <button>스터디 참여하기</button>
          </div>

          <div className="cards">
            <div>
              <span className="tag">#프론트엔드 #JavaScript</span>
              <DummyCard
                summary={'한 달 동안 모딥다 마스터하는 스터디 입니다・・・'}
                src={스터디사진1}
                teamName={'모딥다부셔'}
                capacity={'4'}
              />
            </div>
            <div className="secondCard">
              <span className="tag">#백엔드 #Spring</span>
              <DummyCard
                summary={'함께 SPRING 공부할 사람 모집 합니다・・・'}
                src={스터디사진2}
                teamName={'백투더스터디'}
                capacity={'5'}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div css={third} className="contentsContainer">
          3
        </div>
      </section>
    </div>
  );
}

export default Landing;
