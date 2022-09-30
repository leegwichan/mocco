import React, { useEffect, useMemo, useState } from 'react'; // eslint-disable-line no-unused-vars
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../atom/atom';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import request from '../../../api/index';
import Button from '../Button';
import ProfileModal from './ProfileModal';

const Container = css`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 5px 2px -2px rgba(0, 0, 0, 0.25);
  z-index: 3;
`;

function Header() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState); //eslint-disable-line no-unused-vars
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); //eslint-disable-line no-unused-vars
  const [alarm, setAlarm] = useState([]); //eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  // 알람 받기

  useEffect(() => {
    const evtSource = new EventSource(
      `http://3.35.54.62:8080/api/alarm/subscribe?member-id=${userInfo.memberId}`
    );
    evtSource.onopen = () => {
      // console.log('구독 성공');
    };
    evtSource.onmessage = (msg) => {
      // console.log(JSON.parse(msg.data));
      setAlarm([...JSON.parse(msg.data)]);
    };
    evtSource.onerror = (err) => {
      // console.log(err);
    };
    return () => {
      evtSource.close();
    };
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
      .catch((err) => {
        console.log(err);
      });
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
                  <ProfileModal
                    userInfo={userInfo}
                    handleLogoutClick={handleLogoutClick}
                    handleModifyClick={handleModifyClick}
                    alarm={alarm}
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
  );
}

export default Header;
