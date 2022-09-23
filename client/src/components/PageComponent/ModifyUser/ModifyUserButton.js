import { css } from '@emotion/react';

function ModifyUserButton({ buttonText, type, onClick }) {
  return (
    <div>
      {buttonText !== '회원 탈퇴' && (
        <button type={type} css={positiveButtonStyle} onClick={onClick}>
          {buttonText}
        </button>
      )}
      {buttonText === '회원 탈퇴' && (
        <button type={type} css={negativeButtonStyle} onClick={onClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

const positiveButtonStyle = css`
  width: 100%;
  height: 40px;
  color: #ffffff;
  background-color: #0b6ff2;
  border-radius: 5px;
  border-width: 0px;
  margin-top: 12px;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: normal;
`;

const negativeButtonStyle = css`
  width: 100%;
  height: 40px;
  color: #ffffff;
  background-color: #999999;
  border-radius: 5px;
  border-width: 0px;
  margin-top: 12px;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: normal;
`;

export default ModifyUserButton;
