import { css } from '@emotion/react';
import ModalPortal from './Potal';

/**
 * 모달 컴포넌트
 */
const Modal = ({ onClose, style, children }) => {
  return (
    <ModalPortal>
      {/* Backdrop */}
      <div
        css={css`
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.7);
        `}
        onClick={onClose}
        onKeyPress={onClose}
      />

      {/* Contents */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '250px',
          borderRadius: '8px',
          ...style?.content,
        }}
      >
        {children}
      </div>
    </ModalPortal>
  );
};

export default Modal;
