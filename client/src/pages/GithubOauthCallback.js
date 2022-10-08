import React, { useEffect, useRef } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import request from '../api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';
import { useLocation, useNavigate } from 'react-router-dom';
import 달리는사람 from '../asset/달리는사람.png';
import 달리는괴물 from '../asset/달리는괴물.png';

const Loading = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1000px;

  div {
    font-size: 2rem;
  }

  .progressContainer {
    width: 40vw;
    max-width: 530px;
    height: 4vw;
    max-height: 34px;
    background: #fffefe;
    box-shadow: -5px 6px 5px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    display: flex;
    align-items: center;
    span {
      font-weight: 600;
      font-size: 17px;
      line-height: 27px;
      color: #0f6ad5;
      margin-left: 4%;
      @media all and (max-width: 767px) {
        font-size: 2vw;
      }
    }
  }
  .bar {
    width: 0%;
    height: 4vw;
    max-height: 34px;
    background: #0f6ad5;
    border-radius: 10px;
    animation: progress 4s ease-in-out forwards;
    @keyframes progress {
      0% {
        width: 0;
      }
    }
  }
  .txt {
    font-size: 45px;
    font-weight: 500;
    color: #0b6ff2;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
  }
  .txtWithCharac {
    display: flex;
    align-items: center;
    .human {
      width: 90px;
      @media all and (max-width: 767px) {
        width: 12vw;
      }
    }
  }
  .mocco {
    width: 130px;
    margin-right: 20px;
    @media all and (max-width: 767px) {
      width: 15vw;
    }
  }
`;

function GithubOauthCallback() {
  const member = useRecoilValue(userInfoState);
  const memberId = member.memberId;
  const navigate = useNavigate();
  const location = useLocation();
  const bar = useRef(null);

  useEffect(() => {
    bar.current.style.width = '100%';
    let code = location.search.substring(6);
    let body = {
      authorizationCode: code,
    };
    async function getData() {
      try {
        const response = await request.patch(`/api/members/github-user`, body);
        console.log(response);
        console.log(response.data);
        navigate(`/main/${memberId}`);
      } catch (err) {
        console.log(err);
        if (
          err.response.data.status === 400 &&
          err.response.data.message ===
            '이 계정의 깃허브를 연동한 유저가 이미 존재합니다.'
        ) {
          alert(err.response.data.message);
          navigate(-2);
        }
        if (err.response.data.status === 500) {
          alert(err.response.data.message);
          navigate(-2);
        }
      }
    }
    getData();
  }, [location]);

  return (
    <div css={Loading}>
      <img className="mocco" src={달리는괴물} alt="달리는괴물"></img>

      <div>
        <div className="txtWithCharac">
          <div className="txt">깃헙 로그인중...</div>
          <img className="human" src={달리는사람} alt="달리는사람"></img>
        </div>
        <div className="progressContainer">
          <div className="bar" ref={bar}></div>
        </div>
      </div>
    </div>
  );
}

export default GithubOauthCallback;
