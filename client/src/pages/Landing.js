import { css } from '@emotion/react';
import request from '../api';
import 랜딩모바일 from '../asset/랜딩모바일.png';
import DummyCard from '../components/PageComponent/Landing/DummyCard';
import 스터디사진1 from '../asset/스터디사진1.png';
import 스터디사진2 from '../asset/스터디사진2.png';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 달리는괴물 from '../asset/달리는괴물.png';
import 달리는사람 from '../asset/달리는사람.png';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';
import { CountUp } from '../components/Common/CountUp';

const MainContainer = css`
  width: 100vw;
  padding-top: 4rem;
  .section {
    width: 100vw;
    height: 58vh;
    padding: 4vw 0vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    @media all and (max-width: 767px) {
      height: 100%;
      padding: 20vw 0vw;
    }
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
    @media all and (max-width: 767px) {
      padding: 0px 1rem;
    }
  }

  .imgContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px -5px 0px 9vw;
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
    padding-bottom: 4vw;
    .firstTxt {
      font-weight: 600;
      font-size: 45px;
      color: #000000;
      margin-bottom: 1rem;

      @media all and (max-width: 767px) {
        font-size: 4vw;
      }
    }
    .progressCountUp {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 25px;
      line-height: 27px;
      color: #0b6ff2;
      @media all and (max-width: 767px) {
        font-size: 2vw;
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
      margin-right: 10px;
    }
    .bar {
      width: 0%;
      height: 4vw;
      max-height: 34px;
      background: #0b6ff2;
      border-radius: 10px;
      animation: progress 3s ease-in-out forwards;
      @keyframes progress {
        0% {
          width: 0;
        }
      }
    }
  }
`;

const second = css`
  display: flex;
  align-items: center;
  .midTxt {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 4%;
    @media all and (max-width: 1023px) {
      font-size: 3vw;
    }
    @media all and (max-width: 767px) {
      font-size: 4vw;
    }
  }
  .smallTxt {
    margin-bottom: 10%;
    p {
      font-size: 1.2rem;
    }
    .includeSpan {
      line-height: 150%;
    }
    @media all and (max-width: 1023px) {
      p {
        font-size: 0.6rem;
      }
    }
    @media all and (max-width: 767px) {
      margin-bottom: 20%;
      p {
        font-size: 0.7rem;
      }
    }
  }

  button {
    background: #0b6ff2;
    cursor: pointer;
    border-radius: 8px;
    width: 170px;
    padding: 10px;
    color: white;
    font-weight: 600;
    font-size: 15px;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
    border: none;
    :hover {
      background: white;
      color: #0b6ff2;
    }
    @media all and (max-width: 767px) {
      display: none;
    }
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
  }
  @media all and (max-width: 767px) {
    flex-direction: column;
    .cards {
      .secondCard {
        margin-left: 10%;
      }
    }
  }
`;

const third = css`
  display: flex;
  align-items: center;
  @media all and (max-width: 767px) {
    flex-direction: column-reverse;
  }

  .midTxt {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 4%;
    @media all and (max-width: 1023px) {
      font-size: 3vw;
    }
    @media all and (max-width: 767px) {
      font-size: 4vw;
    }
  }
  .smallTxt {
    margin-bottom: 10%;
    p {
      font-size: 1.2rem;
    }
    @media all and (max-width: 1023px) {
      p {
        font-size: 0.6rem;
      }
    }
    @media all and (max-width: 767px) {
      margin-bottom: 20%;
      p {
        font-size: 0.7rem;
      }
    }
  }

  button {
    background: #0b6ff2;
    cursor: pointer;
    border-radius: 8px;
    width: 170px;
    padding: 10px;
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
    border: none;
    :hover {
      background: #ffffff;
      color: #0b6ff2;
    }
    @media all and (max-width: 767px) {
      display: none;
    }
  }
  .secondLeft {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .task {
    width: 40vw;
    max-width: 400px;
    height: 60px;
    background: #ffffff;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    .txtCheck {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 2vw;
    }
    svg {
      width: 40px;
    }
    @media all and (max-width: 767px) {
      width: 55vw;
      min-width: 275px;
      height: 12vw;
      font-size: 3vw;
    }
  }

  .date {
    width: 10vw;
    max-width: 80px;
    min-width: 50px;
    height: 60px;
    background: #0b6ff2;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    color: #ffffff;
    @media all and (max-width: 767px) {
      font-size: 2.3vw;
      height: 12vw;
    }
    @media all and (max-width: 500px) {
      font-size: 2vw;
    }
  }

  .taskBars {
    margin-bottom: 15px;
  }
`;

const studyNum = css`
  color: #0b6ff2;
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0 0.5rem;
  @media all and (max-width: 1023px) {
    font-size: 20px;
  }
  @media all and (max-width: 767px) {
    font-size: 18px;
  }
`;

const charac = css`
  .human {
    position: absolute;

    width: 100px;
    bottom: -30px;
    left: 60%;
  }
  .mocco {
    position: absolute;
    width: 130px;
    bottom: -30px;
    left: 20%;
  }
  @media all and (max-width: 767px) {
    .human {
      width: 15vw;
      bottom: -50px;
      left: 60%;
    }
    .mocco {
      width: 17vw;
      bottom: -50px;
      left: 20%;
    }
  }
`;

const illustBy = css`
  color: white;
  font-size: 1px;
  a {
    color: white;
  }
`;

function Landing() {
  const [study, setStudy] = useState(null);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const bar = useRef(null);

  useEffect(() => {
    request.get('/api/study-info/study-count').then((res) => {
      setStudy({ ...res.data.data });
    });
    bar.current.style.width = '100%';
  }, []);

  const clickHandler = () => {
    navigate('studylist');
  };

  const handleEnterStudyClick = () => {
    navigate('/studylist');
  };

  return (
    <div css={MainContainer}>
      <section className="section">
        <div css={first} className="contentsContainer">
          <div className="imgContainer">
            <img src={랜딩모바일} alt="스마트폰실사용 화면"></img>
            <div css={illustBy}>
              Illustration by
              <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">
                Icons 8
              </a>
              from
              <a href="https://icons8.com/illustrations">Ouch!</a>
            </div>
          </div>
          <div className="progress">
            <span className="firstTxt">
              <p>언제 어디서나</p>
              <p>모꼬와 함께 온라인 스터디</p>
            </span>
            <div className="progressCountUp">
              <div className="progressContainer">
                <div className="bar" ref={bar}></div>
              </div>
              <CountUp number={100} />
            </div>
          </div>
        </div>
      </section>

      <section className="second section">
        <div css={second} className="contentsContainer">
          <div className="secondLeft">
            <div className="midTxt">
              <p>이제 혼자 코딩하지 마세요</p>
              <p>원하는 스터디에 참여하세요</p>
            </div>
            <div className="smallTxt">
              <p className="includeSpan">
                모꼬에서는 현재
                <span css={studyNum}>{study && study.recruitStudy}</span>
                개의 스터디가 모집중이고
              </p>
              <p className="includeSpan">
                <span css={studyNum}>{study && study.progressStudy}</span>
                개의 스터디가 진행중이에요
              </p>
              <p>모코에서 함께 공부할 스터디 친구를 만나보세요</p>
            </div>
            <button onClick={clickHandler}>스터디 참여하기</button>
          </div>

          <div className="cards">
            <div>
              <DummyCard
                hashTag={'#프론트엔드 #JS'}
                summary={'모딥다 마스터하는 스터디 입니다・・・'}
                src={스터디사진1}
                teamName={'모딥다부셔'}
                capacity={'4'}
              />
            </div>
            <div className="secondCard">
              <DummyCard
                hashTag={'#백엔드 #Spring'}
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
          <section>
            <div className="taskBars">
              <div className="task">
                <div className="date">04/03</div>
                <div className="txtCheck">
                  리액트 강의 1~30강 듣기
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    fill="#0b68ff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="taskBars">
              <div className="task">
                <div className="date">04/12</div>
                <div className="txtCheck">
                  개인 토이 프로젝트
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    fill="#0b68ff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="taskBars">
              <div className="task">
                <div className="date">04/30</div>
                <div className="txtCheck">
                  스터디 서브 프로젝트
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    strokeLinejoin="round"
                    strokeMiterlimit="2"
                    fill="#0b68ff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
          <div className="secondLeft">
            <div className="midTxt">
              <p>모꼬를 피해서</p>
              <p>원하는 목표량을 달성해보세요</p>
            </div>
            <div className="smallTxt">
              <p>정해진 기한 내에 테스크를 수행해 모꼬에게서 달아나보세요!</p>
              <p>모꼬와 함께 즐겁게 공부 해 보아요</p>
            </div>
            <button onClick={clickHandler}>스터디 참여하기</button>
          </div>
        </div>
        <div css={charac}>
          <img className="mocco" src={달리는괴물} alt="달리는괴물"></img>
          <img className="human" src={달리는사람} alt="달리는사람"></img>
        </div>
      </section>
      {/* 비로그인 시 스터디 참여하기 버튼 */}
      {!userInfo && console.log('비로그인')}
      {!userInfo && console.log(userInfo)}
      {!userInfo && (
        <button
          onClick={handleEnterStudyClick}
          css={css`
            position: fixed;
            left: 10%;
            bottom: 1rem;
            width: 80%;
            height: 3rem;
            border: none;
            border-radius: 0.5rem;
            background-color: #0b6bff;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 5;
            @media (min-width: 769px) {
              display: none;
            }
          `}
        >
          스터디 참여하기
        </button>
      )}
    </div>
  );
}

export default Landing;
