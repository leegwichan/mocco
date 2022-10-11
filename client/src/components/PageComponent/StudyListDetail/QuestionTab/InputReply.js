import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useInputValid } from '../hooks/useInputValid';
import { useNavigate, useParams } from 'react-router-dom';

function InputReply({ setIsReplyOpen, commentId, userInfo, getCommentInfof }) {
  const { value, setIsValid, handleChange, handleClick, handlePress } =
    useInputValid({
      initialvalues: '',
      onClick: () => {
        replyHandler();
      },
    });
  const navigate = useNavigate();
  const { id } = useParams();

  const replyInfo = {
    memberId: userInfo && userInfo.memberId,
    commentId: commentId,
    content: value,
  };

  const replyHandler = () => {
    if (userInfo === null) {
      navigate('/login', { state: { from: `/studylist/detail/${id}` } });
    } else {
      return request.post(`/api/replies`, replyInfo).then(() => {
        setIsReplyOpen(false);
        setIsValid(true);
        getCommentInfof();
      });
      // .catch((err) => console.log(err));
    }
  };

  return (
    <section css={container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="#0b6ff2"
        className="bi bi-arrow-return-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
        />
      </svg>
      <section css={replyInput}>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="답글을 입력하세요"
          onKeyPress={handlePress}
        />
        <div className="button_container">
          <Button type={'small_blue'} text={'등록'} onClick={handleClick} />
          <Button
            type={'small_grey'}
            text={'취소'}
            onClick={() => setIsReplyOpen(false)}
          />
        </div>
      </section>
    </section>
  );
}

export default InputReply;

const container = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  svg {
    margin-left: -15px;
    margin-top: -8px;
    flex: 1 0;

    @media all and (max-width: 1500px) {
      margin-left: -14px;
    }

    @media all and (max-width: 1000px) {
      margin-left: -11px;
    }

    @media all and (max-width: 768px) {
      width: 40px;
      height: 40px;
      margin-left: 0px;
    }
  }
`;

const replyInput = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;
  flex: 9 0;

  textarea {
    width: 99%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    padding: 9px;
    resize: none;
    outline: none;

    ::-webkit-scrollbar {
      display: none;
    }

    @media all and (max-width: 768px) {
      width: 96%;
    }
  }

  .button_container {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    margin-top: 10px;

    @media all and (max-width: 768px) {
      button {
        font-size: 15px;
        height: 35px;
        width: 48px;
        margin-left: 7px;
        padding-top: 4px;
      }
    }

    @media all and (max-width: 420px) {
      button {
        font-size: 11px;
        height: 32px;
        width: 38px;
        margin-left: 7px;
        padding-top: 0px;
      }
    }
  }
`;
