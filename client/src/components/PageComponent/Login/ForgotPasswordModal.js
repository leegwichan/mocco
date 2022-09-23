import { css } from '@emotion/react';
import { useState } from 'react';
import request from '../../../api';
import Modal from '../../Common/Modal';

function ForgotPasswordModal({ onClose }) {
  const [complete, setComplete] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    request({
      method: 'get',
      url: `/api/register/finding-password`,
      params: { email: event.target.email.value },
    })
      .then(() => setComplete(true))
      .catch(function () {
        setIsError(true);
      });
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
          <span
            css={css`
              font-size: 14px;
              flex: 1;
              display: flex;
              align-items: center;
              padding-bottom: 30px;
            `}
          >
            <p
              css={css`
                font-size: 18px;
              `}
            >
              재설정 이메일을 발송했습니다.
            </p>
          </span>
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
              border-radius: 5px;
              border: 1px solid #d1d1d1;
            `}
            type="email"
          />
          {isError && (
            <p
              css={css`
                font-size: 14px;
                color: red;
              `}
            >
              잘못된 이메일 입니다.
            </p>
          )}

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
  height: 250px;
  width: 300px;
  padding-top: 30px;
`;

const modalButton = css`
  width: 240px;
  height: 40px;
  border-radius: 5px;
  background-color: #0b6ff2;
  margin-bottom: 24px;
  font-size: 18px;
  color: #ffffff;
  border: none;
`;

export default ForgotPasswordModal;
