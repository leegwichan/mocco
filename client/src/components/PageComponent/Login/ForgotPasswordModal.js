import { css } from '@emotion/react';
import Modal from '../../Common/Modal';

function ForgotPasswordModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
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
        `}
      >
        비밀번호 찾기
      </h3>
    </Modal>
  );
}

export default ForgotPasswordModal;
