import { css } from '@emotion/react';
import { useState, memo } from 'react';
import Button from '../../../Common/Button';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../atom/atom';
import request from '../../../../api';
import { useParams } from 'react-router-dom';

const InputComment = memo(({ getCommentInfof }) => {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const userInfo = useRecoilValue(userInfoState);

  const commentInfo = {
    content: commentContent,
    memberId: userInfo.memberId,
    studyId: id,
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    setErrMessage('');

    if (commentContent === '') {
      setErrMessage('내용을 입력해주세요');
      setIsValid(false);
    } else if (commentContent.length >= 300) {
      setErrMessage('300자 미만으로 입력해주세요');
      setIsValid(false);
    } else {
      return request
        .post('/api/comments', commentInfo)
        .then(() => {
          setIsValid(true);
          setCommentContent('');
          getCommentInfof();
        })
        .catch(() => console.log(userInfo));
    }
  };

  return (
    <div>
      <div css={container}>
        <input
          type="text"
          placeholder="스터디에 대한 궁금한 점을 물어보세요"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <Button
          type={'big_blue'}
          text={'등록'}
          onClick={addCommentHandler}
          disabled={!isValid}
        />
      </div>
      {errMessage && <div css={err}>{errMessage}</div>}
    </div>
  );
});

InputComment.displayName = 'InputComment';

export default InputComment;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 975px;
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }
`;

const err = css`
  color: red;
`;
