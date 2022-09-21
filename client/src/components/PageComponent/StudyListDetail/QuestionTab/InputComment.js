import { css } from '@emotion/react';
import { useState } from 'react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useParams } from 'react-router-dom';

function InputComment() {
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState('');

  const commentInfo = {
    content: commentContent,
    memberId: '1',
    studyId: id,
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    return request
      .post('/api/comments', commentInfo)
      .then(() => {
        setCommentContent('');
        window.location.reload();
      })
      .err((err) => console.log(err));
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <input
        css={css`
          width: 900px;
          height: 40px;
          border: 1px solid #d1d1d1;
          border-radius: 5px;
        `}
        type="text"
        placeholder="스터디에 대한 궁금한 점을 물어보세요"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button type={'big_blue'} text={'등록'} onClick={addCommentHandler} />
    </div>
  );
}

export default InputComment;
