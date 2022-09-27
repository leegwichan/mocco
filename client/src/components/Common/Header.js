import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../atom/atom';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import request from '../../api/index';
import Button from './Button';

const Container = css`
  position: fixed;
  width: 100vw;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 5px 2px -2px rgba(0, 0, 0, 0.25);
  z-index: 3;
`;

function Header() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); //eslint-disable-line no-unused-vars
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); //eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  // 버튼 클릭 핸들러
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    request
      .post(
        '/api/register/logout',
        {},
        {
          headers: {
            AccessToken: localStorage.getItem('accessToken'),
          },
        }
      )
      .then(() => {
        setUserInfo(null);
      })
      .catch((err) => console.log(err));
  };

  const handleFindStudyClick = () => {
    navigate('/studylist');
  };

  const handleMyPageClick = () => {
    navigate(`/main/${userInfo.nickname}`);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  return (
    <header css={Container}>
      <div
        css={css`
          display: flex;
          max-width: 1200px;
          height: 100%;
          margin: 0 auto;
          justify-content: space-between;
        `}
      >
        {/* 왼쪽 컨테이너 */}
        <div
          css={css`
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            css={css`
              height: 100%;
            `}
          >
            <img
              src="/MoccoLogo.jpeg"
              alt="mocco_logo"
              css={css`
                height: 100%;
              `}
            />
          </div>
          <Button
            text={'스터디 찾기'}
            type={'header_skyblue'}
            onClick={handleFindStudyClick}
          />
          <Button
            text={'마이 페이지'}
            type={'header_skyblue'}
            onClick={handleMyPageClick}
          />
        </div>
        {/* 오른쪽 컨테이너 */}
        <div
          css={css`
            display: inline-flex;
            height: 100%;
            align-items: center;
          `}
        >
          {userInfo ? (
            <>
              <div
                css={css`
                  position: relative;
                  display: inline-flex;
                  height: 100%;
                  align-items: center;
                `}
              >
                <button
                  onClick={handleProfileClick}
                  css={css`
                    position: relative;
                    display: flex;
                    height: 100%;
                    align-items: center;
                    border: none;
                    background-color: #ffffff;
                    cursor: pointer;
                  `}
                >
                  <img
                    src="/logo192.png"
                    alt="프로필사진"
                    css={css`
                      height: 60%;
                      border-radius: 50%;
                    `}
                  />
                </button>
                {/* 프로필 모달 */}
                {isProfileModalOpen ? (
                  <div
                    css={css`
                      position: absolute;
                      top: 83px;
                      right: 0;
                      width: 300px;
                      height: 650px;
                      padding: 1rem;
                      border: 2px solid #0b6ff2;
                      border-radius: 5px;
                      background-color: #f0f8ff;

                      &::before {
                        content: '';
                        position: absolute;
                        right: 15px;
                        top: -20px;
                        border-right: 10px solid transparent;
                        border-left: 10px solid transparent;
                        border-bottom: 20px solid #0b6ff2;
                      }
                    `}
                  >
                    {/* 프로필 사진 / 닉네임 / 이메일 컨테이너 */}
                    <div
                      css={css`
                        display: flex;
                        width: 100%;
                        height: 64px;
                        margin-bottom: 1rem;
                      `}
                    >
                      <div
                        css={css`
                          display: inline-block;
                          height: 100%;
                          margin-right: 0.8rem;
                        `}
                      >
                        <img
                          src="/logo192.png"
                          alt="프로필사진"
                          css={css`
                            height: 100%;
                          `}
                        />
                      </div>
                      <div
                        css={css`
                          display: inline-flex;
                          height: 100%;
                          padding: 0.5rem 0;
                          flex-direction: column;
                        `}
                      >
                        <div
                          css={css`
                            height: 50%;
                            line-height: 200%;
                          `}
                        >
                          {userInfo.nickname}
                        </div>
                        <div
                          css={css`
                            height: 50%;
                            line-height: 200%;
                          `}
                        >
                          {userInfo.email}
                        </div>
                      </div>
                    </div>
                    {/* 프로필 수정 / 로그아웃 버튼 컨테이너 */}
                    <div
                      css={css`
                        display: flex;
                        width: 100%;
                        height: 6rem;
                        margin-bottom: 1rem;
                        flex-direction: column;
                        background-color: green;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          height: 50%;
                          align-items: center;
                        `}
                      >
                        <Button
                          text={'프로필 수정'}
                          type={'profile_modal_blue'}
                        />
                      </div>
                      <div
                        css={css`
                          display: flex;
                          height: 50%;
                          align-items: center;
                        `}
                      >
                        <Button text={'로그아웃'} type={'profile_modal_grey'} />
                      </div>
                    </div>
                    {/* 알림 창 */}
                    <div
                      css={css`
                        width: 100%;
                        height: 400px;
                        background-color: pink;
                      `}
                    ></div>
                  </div>
                ) : null}
              </div>
              <Button
                text={'로그아웃'}
                type={'header_log'}
                onClick={handleLogoutClick}
              />
            </>
          ) : (
            <Button
              text={'로그인'}
              type={'header_log'}
              onClick={handleLoginClick}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
