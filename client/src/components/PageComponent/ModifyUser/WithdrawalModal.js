import { useState } from 'react';
import Modal from '../../Common/Modal';
import { css } from '@emotion/react';
import ModifyUserInput from './ModifyUserInput';
import ModifyUserButton from './ModifyUserButton';
import request from '../../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../atom/atom';

function WarningDescription() {
  return (
    <div
      css={css`
        display: flex;
        margin-bottom: 10px;
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        width="18px"
        height="18px"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>

      <p
        css={css`
          font-size: 11px;
          display: flex;
          align-items: center;
          margin-left: 6px;
        `}
      >
        지금까지 완료한 스터디 정보가 삭제 됩니다.
      </p>
    </div>
  );
}

function WithdrawalModal({ onClose }) {
  const userInfo = useRecoilValue(userInfoState);

  const [disabled, setDisabled] = useState(true);

  const onChange = (event) => {
    setDisabled(event.currentTarget.value !== userInfo.email);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    request({
      method: 'delete',
      url: `/api/members/${userInfo.memberId}`,
    })
      .then(onclose)
      .then(() => alert('회원 탈퇴 성공'));
  };

  return (
    <Modal onClose={onClose}>
      <form
        css={css`
          margin: 0 32px;
        `}
        onSubmit={onSubmit}
      >
        <h3
          css={css`
            text-align: center;
            margin-top: 32px;
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: bold;
          `}
        >
          회원 탈퇴
        </h3>
        <div
          css={css`
            margin-bottom: 15px;
          `}
        >
          <h4
            css={css`
              font-size: 14px;
              margin-bottom: 15px;
            `}
          >
            {userInfo.nickname}님,
            <br /> 정말 탈퇴하시겠어요?
          </h4>
          <WarningDescription />
          <WarningDescription />
          <WarningDescription />
        </div>
        <ModifyUserInput
          labelText="탈퇴하시려면 이메일을 입력해주세요."
          name="checkEmail"
          onChange={onChange}
        />
        <div>
          <ModifyUserButton buttonText="탈퇴하기" disabled={disabled} />
        </div>
      </form>
    </Modal>
  );
}

export default WithdrawalModal;
