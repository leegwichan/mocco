import { css } from '@emotion/react';
import Button from './Button';

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 594px;
  width: 541px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 49px 31px 18px 31px;
  .title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    color: #0b6ff2;
    margin-bottom: 31px;
  }
  @media all and (max-width: 1023px) {
    height: 55vw;
    min-height: 400px;
    width: 50vw;
    min-width: 350px;
    .title {
      font-size: 3vw;
      margin-bottom: 15px;
    }
  }
  @media all and (max-width: 700px) {
    .title {
      font-size: 21px;
    }
  }
`;

const InnerContainer = css`
  width: 479px;
  white-space: pre-wrap;
  height: 412px;
  background: #ffffff;
  box-shadow: inset 5px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 23px 26px 20px 26px;
  :overflow-y {
    overflow: scroll;
  }
  @media all and (max-width: 1023px) {
    height: 50vw;
    min-height: 270px;
    width: 43vw;
    min-width: 300px;
    padding: 4%;
    .title {
      font-size: 3vw;
    }
  }
`;

const ButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media all and (max-width: 700px) {
    margin-bottom: 5px;
  }
`;

export const ModalContent = ({
  text,
  content,
  firstBtnType,
  secondBtnType,
  firstBtnText,
  secondBtnText,
  setIsOpen,
  onClick,
  // reset,
}) => {
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div css={Container}>
      <section className="title">{text}</section>
      <section css={InnerContainer}>{content}</section>
      <section css={ButtonContainer}>
        <Button
          type={`${firstBtnType}`}
          text={`${firstBtnText}`}
          onClick={onClick}
        />
        <Button
          type={`${secondBtnType}`}
          text={`${secondBtnText}`}
          onClick={onClose}
        />
      </section>
    </div>
  );
};

export const OneModalContent = ({
  text,
  content,
  btnType,
  btnText,
  onClick,
}) => {
  return (
    <div css={Container}>
      <section className="title">{text}</section>
      <section css={InnerContainer}>{content}</section>
      <section css={ButtonContainer}>
        <Button type={`${btnType}`} text={`${btnText}`} onClick={onClick} />
      </section>
    </div>
  );
};
