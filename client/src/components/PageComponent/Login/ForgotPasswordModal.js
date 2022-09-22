import { css } from '@emotion/react';
import { useState } from 'react';
// import request from '../../../api';
import Modal from '../../Common/Modal';

function ForgotPasswordModal({ onClose }) {
  const [complete, setComplete] = useState(false);

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   request({
  //     method: 'get',
  //     url: `/api/register/finding-password`,
  //     params: { email: 'cnddkscndgus@naver.com' },
  //   }).then(() => setComplete(true));
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    setComplete(true);
  };

  return (
    <Modal onClose={onClose}>
      <h3
        css={css`
          text-align: center;
          font-size: 18px;
          margin-top: 24px;
        `}
      >
        비밀번호 찾기
      </h3>

      {complete ? (
        <div css={modalContentWrapper}>
          <p
            css={css`
              font-size: 14px;
            `}
          >
            가입하신 이메일을 입력 해 주세요.
          </p>
          <button css={modalButton} type="button" onClick={onClose}>
            닫기
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} css={modalContentWrapper}>
          <label
            htmlFor="email"
            css={css`
              font-size: 14px;
            `}
          >
            가입하신 이메일을 입력 해 주세요.
          </label>
          <input
            name="email"
            css={css`
              width: 240px;
              height: 30px;
              border-color: #d1d1d1;
              border-radius: 5px;
            `}
            type="email"
          />

          <button css={modalButton} type="submit">
            비밀번호 재설정
          </button>
        </form>
      )}
    </Modal>
  );
}

const modalContentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 160px;
`;

const modalButton = css`
  width: 240px;
  height: 40px;
  border-radius: 5px;
  background-color: #0b6ff2;
  margin-bottom: 24px;
  font-size: 18px;
  color: #ffffff;
`;

export default ForgotPasswordModal;
