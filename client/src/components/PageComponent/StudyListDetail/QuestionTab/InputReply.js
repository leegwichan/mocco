import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useInputValid } from '../hooks/useInputValid';

function InputReply({ setIsReplyOpen, commentId, userInfo, getCommentInfof }) {
  const { value, setIsValid, handleChange, handleClick } = useInputValid({
    initialvalues: '',
    onClick: () => {
      replyHandler();
    },
  });

  const replyInfo = {
    memberId: userInfo.memberId,
    commentId: commentId,
    content: value,
  };

  const replyHandler = () => {
    return request
      .post(`/api/replies`, replyInfo)
      .then(() => {
        setIsReplyOpen(false);
        setIsValid(true);
        getCommentInfof();
      })
      .catch((err) => console.log(err));
  };

  return (
    <main css={main}>
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
      <div css={reply_input}>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="답글을 입력하세요"
        />
        <div className="button_container">
          <Button type={'small_blue'} text={'등록'} onClick={handleClick} />
          <Button
            type={'small_grey'}
            text={'취소'}
            onClick={() => setIsReplyOpen(false)}
          />
        </div>
      </div>
    </main>
  );
}

export default InputReply;

const main = css`
  display: flex;
  justify-content: space-between;

  svg {
    margin-left: 20px;
    margin-top: -10px;
  }
`;

const reply_input = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 25px;

  textarea {
    width: 990px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    padding: 10px;
    resize: none;
    ::-webkit-scrollbar {
      display: none;
    }
    outline: none;
  }
  .button_container {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    margin-top: 10px;
  }
`;
