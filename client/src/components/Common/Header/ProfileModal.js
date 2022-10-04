import { css } from '@emotion/react';
import request from '../../../api/index';
import Button from '../Button';
import Alarm from './Alarm';

function ProfileModal({
  userInfo,
  handleLogoutClick,
  handleModifyClick,
  alarm,
  setAlarm,
}) {
  // 삭제 버튼 클릭 핸들러
  const handleDeleteAll = () => {
    request
      .delete(`/api/alarm?member-id=${userInfo.memberId}`)
      .catch((err) => console.log(err));
    setAlarm([]);
  };

  const handleDeleteAlarm = (alarmId) => {
    request.delete(`/api/alarm/${alarmId}`);
    setAlarm(
      alarm.filter((item) => {
        if (item.alarmId !== alarmId) return item;
      })
    );
  };
  return (
    <div
      css={css`
        display: flex;
        position: absolute;
        top: 83px;
        right: 0;
        width: 350px;
        height: 650px;
        padding: 1rem;
        flex-direction: column;
        border: 2px solid #afdafd;
        border-radius: 5px;
        background-color: #f0f8ff;
        @media (min-width: 769px) {
          &::before {
            content: '';
            position: absolute;
            right: 15px;
            top: -20px;
            border-right: 10px solid transparent;
            border-left: 10px solid transparent;
            border-bottom: 20px solid #afdafd;
          }
        }
        @media (max-width: 768px) {
          width: calc(100vw);
          height: calc(100vh - 8rem);
          top: 4rem;
          right: -1rem;
        }
      `}
    >
      {/* 프로필 사진 / 닉네임 / 이메일 컨테이너 */}
      <div
        css={css`
          display: flex;
          flex: 1 0;
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
            flex-shrink: 0;
          `}
        >
          <img
            src={userInfo.profileImage}
            alt="프로필사진"
            css={css`
              height: 100%;
              background-color: #ffffff;
              border-radius: 50%;
              aspect-ratio: 1/1;
            `}
          />
        </div>
        <div
          css={css`
            display: inline-flex;
            height: 100%;
            padding: 0.5rem 0;
            flex-grow: 1;
            flex-shrink: 1;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <div
            css={css`
              padding-bottom: 0.5rem;
            `}
          >
            {userInfo.nickname}
          </div>
          <div
            css={css`
              word-break: break-word;
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
          flex: 1 0;
          width: 100%;
          height: 6rem;
          margin-bottom: 1rem;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            height: 50%;
            margin-bottom: 0.5rem;
            align-items: center;
          `}
        >
          <Button
            text={'프로필 수정'}
            type={'profile_modal_blue'}
            onClick={handleModifyClick}
          />
        </div>
        <div
          css={css`
            display: flex;
            height: 50%;
            align-items: center;
          `}
        >
          <Button
            text={'로그아웃'}
            type={'profile_modal_grey'}
            onClick={handleLogoutClick}
          />
        </div>
      </div>
      {/* 알림 창 */}
      <div
        css={css`
          width: 100%;
          height: 400px;
          flex: 5 0;
          border: 1px solid #0b6ff2;
          border-radius: 0.2rem;
          background-color: white;
        `}
      >
        <div
          css={css`
            display: flex;
            height: 10%;
            padding: 0.5rem;
            align-items: center;
            border-bottom: 1px solid #999999;
          `}
        >
          <div
            css={css`
              display: inline-block;
              width: 10%;
              height: 100%;
              margin-right: 5%;
              text-align: center;
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
                height: 100%;
                color: #0b6bff;
              `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </div>
          <div
            css={css`
              display: inline-block;
              width: 60%;
              height: 100%;
              font-size: 1.1rem;
              line-height: 200%;
            `}
          >
            내 알림
          </div>
          <button
            onClick={() => {
              handleDeleteAll(userInfo.memberId);
            }}
            css={css`
              display: inline-block;
              width: 25%;
              padding: 0.5rem 0;
              border: 1px solid #0a6ff2;
              border-radius: 0.2rem;
              background-color: #0a6ff2;
              color: white;
              transition: all 0.1s linear;
              /* &:hover {
                border: 1px solid #0a6ff2;
                background-color: #ffffff;
                color: #0a6ff2;
              } */
              &:active {
                transform: scale(0.9);
              }
              @media (hover: hover) {
                &:hover {
                  border: 1px solid #0a6ff2;
                  background-color: #ffffff;
                  color: #0a6ff2;
                }
              }
            `}
          >
            전체 삭제
          </button>
        </div>
        <ul
          css={css`
            height: 90%;
            overflow: hidden;
            overflow-y: scroll;
            li:last-of-type {
              border-bottom: none;
            }
            li:first-of-type {
              border-bottom: 1px solid #999999;
            }
          `}
        >
          {alarm.map((al, idx) => {
            return (
              <Alarm
                key={idx}
                alarm={al}
                handleDeleteAlarm={handleDeleteAlarm}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProfileModal;
