import React from 'react'; // eslint-disable-line no-unused-vars
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
            align-items: center;
          `}
        >
          {userInfo ? (
            <>
              <button
                css={css`
                  display: flex;
                  height: 100%;
                  align-items: center;
                  border: none;
                  background-color: #ffffff;
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
