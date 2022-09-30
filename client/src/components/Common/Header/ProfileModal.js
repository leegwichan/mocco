import { css } from '@emotion/react';
import Button from '../Button';
import Alarm from './Alarm';

function ProfileModal({
  userInfo,
  handleLogoutClick,
  handleModifyClick,
  alarm,
}) {
  return (
    <div
      css={css`
        display: flex;
        position: absolute;
        top: 83px;
        right: 0;
        width: 300px;
        height: 650px;
        padding: 1rem;
        flex-direction: column;
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
          background-color: white;
        `}
      >
        <div
          css={css`
            height: 10%;
            padding: 0.5rem;
            border-bottom: 1px solid #999999;
          `}
        >
          <div
            css={css`
              display: inline-block;
              width: 10%;
              height: 100%;
              margin-right: 5%;
              font-size: 1.3rem;
            `}
          >
            🔔
          </div>
          <div
            css={css`
              display: inline-block;
              width: 85%;
              height: 20%;
              font-size: 1.3rem;
            `}
          >
            내 알림
          </div>
        </div>
        <ul
          css={css`
            height: 90%;
            overflow: hidden;
            overflow-y: scroll;
            li:last-of-type {
              border-bottom: none;
            }
          `}
        >
          {alarm.map((al, idx) => {
            return <Alarm key={idx} alarm={al} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProfileModal;
