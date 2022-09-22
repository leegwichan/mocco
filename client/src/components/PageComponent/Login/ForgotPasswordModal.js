import { css } from '@emotion/react';
import request from '../../../api';
import Modal from '../../Common/Modal';

function ForgotPasswordModal({ onClose }) {
  const onSubmit = (event) => {
    event.preventDefault();

    request({
      method: 'get',
      url: `/api/register/finding-password?email=cnddkscndgus@naver.com`,
    });
  };
  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={onSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        `}
      >
        <button
          type="button"
          onClick={onClose}
          css={css`
            position: absolute;
            top: 12px;
            right: 8px;
            border: none;
            background-color: white;
            cursor: pointer;
          `}
        >
          X
        </button>
        <h3
          css={css`
            text-align: center;
            font-size: 18px;
            margin-top: 24px;
          `}
        >
          비밀번호 찾기
        </h3>
        <p
          css={css`
            font-size: 14px;
          `}
        >
          가입하신 이메일을 입력 해 주세요.
        </p>
        <input
          css={css`
            width: 240px;
            height: 30px;
            border-color: #d1d1d1;
            border-radius: 5px;
          `}
          type="email"
        ></input>
        <button
          css={css`
            width: 240px;
            height: 40px;
            border-radius: 5px;
            background-color: #0b6ff2;
            margin-bottom: 24px;
            font-size: 18px;
            color: #ffffff;
          `}
        >
          비밀번호 재설정
        </button>
      </form>
    </Modal>
  );
}

export default ForgotPasswordModal;
