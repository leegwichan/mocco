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
  // const [commentInfo, setCommentInfo] = useState({});
  const userInfo = useRecoilValue(userInfoState);

  const commentInfo = {
    content: commentContent,
    memberId: userInfo.memberId,
    studyId: id,
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    setCommentContent('');

    return request
      .post('/api/comments', commentInfo)
      .then(() => {
        // window.location.reload();
        getCommentInfof();
      })
      .catch(() => console.log(userInfo));
  };

  return (
    <div css={container}>
      <input
        type="text"
        placeholder="스터디에 대한 궁금한 점을 물어보세요"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button type={'big_blue'} text={'등록'} onClick={addCommentHandler} />
    </div>
  );
});

InputComment.displayName = 'InputComment';

export default InputComment;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;

  input {
    width: 900px;
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }
`;
