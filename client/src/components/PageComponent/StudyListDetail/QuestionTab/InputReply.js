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
    <div>
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
    </div>
  );
}

export default InputReply;

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
  }
  .button_container {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    margin-top: 10px;
  }
`;
