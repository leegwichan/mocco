import React, { useEffect, useMemo, useRef, useState } from 'react'; // eslint-disable-line no-unused-vars
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../atom/atom';
import { css } from '@emotion/react';
import { useNavigate, Link } from 'react-router-dom';
import request from '../../../api/index';
import Button from '../Button';
import ProfileModal from './ProfileModal';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';

const Container = css`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 5px 2px -2px rgba(0, 0, 0, 0.25);
  z-index: 3;
`;

const HeaderContainer = css`
  display: flex;
  max-width: calc(1200px + 4rem);
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem 0 1.2rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 0 0.8rem 0 0;
  }
`;

const LowerHeader = css`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 4rem;
  background-color: #ffffff;
  z-index: 5;
  @media (min-width: 769px) {
    display: none;
  }
`;

const LowerHeaderFindStudy = css`
  height: 100%;
  flex: 1 0;
  border: none;
  background: none;
  font-size: 0.8rem;
  color: #555555;
`;

function Header() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); //eslint-disable-line no-unused-vars
  const [alarm, setAlarm] = useState([]); //eslint-disable-line no-unused-vars
  const [subscribeId, setSubscribeId] = useState({}); //eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  // 알람 받기
  useEffect(() => {
    if (userInfo) {
      const evtSource = new EventSource(
        `${process.env.REACT_APP_API_URL}/api/alarm/subscribe?member-id=${userInfo.memberId}`
      );
      evtSource.onopen = () => {
        console.log('구독 성공');
      };
      evtSource.onmessage = (msg) => {
        const message = JSON.parse(msg.data);
        if (Array.isArray(message)) {
          setAlarm(message);
        } else {
          setSubscribeId(message);
        }
      };
    }
  }, []);

  // 새로고침 / 창 닫을 시 구독 해제
  const subscribeIdRef = useRef(subscribeId);
  const refToState = (data) => {
    subscribeIdRef.current = data;
  };

  const unsubscribeApi = () => {
    const id = subscribeIdRef.current.subscribeId;
    const apiUrl = process.env.REACT_APP_API_URL;
    navigator.sendBeacon(`${apiUrl}/api/alarm/unsubscribe?subscribe-id=${id}`);
  };

  useEffect(() => {
    refToState(subscribeId);
  }, [subscribeId]);

  useEffect(() => {
    window.addEventListener('unload', unsubscribeApi);
  }, []);

  // 버튼 클릭 핸들러
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleFindStudyClick = () => {
    navigate('/studylist');
  };

  const handleMyPageClick = () => {
    navigate(`/main/${userInfo.memberId}`);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const handleModifyClick = () => {
    navigate('/modifyUser');
    setIsProfileModalOpen(false);
  };

  // 로그아웃
  const handleLogoutClick = () => {
    request
      .post('/api/register/logout')
      .then(() => {
        setAuthorizationToken();
        setUserInfo(null);
      })
      .then(() => navigate('/'));
  };
  return (
    <>
      <header css={Container}>
        <div css={HeaderContainer}>
          {/* 왼쪽 컨테이너 */}
          <div
            css={css`
              display: inline-flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <Link
              to={'/'}
              css={css`
                height: 100%;
                @media (max-width: 768px) {
                  height: 80%;
                }
              `}
            >
              <img
                src="/MoccoLogo.jpeg"
                alt="mocco_logo"
                css={css`
                  height: 100%;
                `}
              />
            </Link>
            <div
              css={css`
                @media (max-width: 768px) {
                  display: none;
                }
              `}
            >
              <Button
                text={'스터디 찾기'}
                type={'header_skyblue'}
                onClick={handleFindStudyClick}
              />
            </div>
            {userInfo ? (
              <div
                css={css`
                  @media (max-width: 768px) {
                    display: none;
                  }
                `}
              >
                <Button
                  text={'마이 페이지'}
                  type={'header_skyblue'}
                  onClick={handleMyPageClick}
                />
              </div>
            ) : null}
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
                      @media (max-width: 768px) {
                        display: none;
                      }
                    `}
                  >
                    <img
                      src={userInfo.profileImage}
                      alt="프로필사진"
                      css={css`
                        height: 60%;
                        border-radius: 50%;
                        aspect-ratio: 1/1;
                      `}
                    />
                    {alarm.length !== 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        css={css`
                          position: absolute;
                          width: 40%;
                          border-radius: 50%;
                          background-color: #0b6bff;
                          color: white;
                          transform: translate(100%, -100%);
                        `}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                    ) : null}
                  </button>
                  {/* 프로필 모달 */}
                  {isProfileModalOpen ? (
                    <ProfileModal
                      userInfo={userInfo}
                      handleLogoutClick={handleLogoutClick}
                      handleModifyClick={handleModifyClick}
                      alarm={alarm}
                      setAlarm={setAlarm}
                    />
                  ) : null}
                </div>
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
      {/* 반응형 하단 바 */}
      {userInfo && (
        <div css={LowerHeader}>
          <button onClick={handleFindStudyClick} css={LowerHeaderFindStudy}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              css={css`
                height: 50%;
              `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>

            <div>스터디 찾기</div>
          </button>

          <button
            onClick={handleMyPageClick}
            css={css`
              height: 100%;
              flex: 1 0;
              border: none;
              background: none;
              font-size: 0.8rem;
              color: #555555;
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              css={css`
                height: 50%;
              `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <div>마이 페이지</div>
          </button>
          <button
            onClick={handleProfileClick}
            css={css`
              height: 100%;
              flex: 1 0;
              border: none;
              background: none;
              color: #555555;
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              css={css`
                height: 50%;
              `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>My</div>
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
