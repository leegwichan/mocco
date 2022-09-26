import { css } from '@emotion/react';

function ModifyUserButton({ buttonText, ...rest }) {
  return (
    <div>
      <button
        css={
          buttonText === '회원 탈퇴' ? negativeButtonStyle : positiveButtonStyle
        }
        {...rest}
      >
        {buttonText}
      </button>
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
  &:disabled {
    background-color: #999999;
  }
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
