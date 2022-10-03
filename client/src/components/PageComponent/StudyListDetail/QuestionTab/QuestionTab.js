import { useState, useEffect, useCallback } from 'react';
import InputComment from './InputComment';
import request from '../../../../api';
import CommentSection from './CommentSection';
import DeletedComment from './DeletedComment';
import { useParams } from 'react-router-dom';
import ReplySection from './ReplySection';
import { css } from '@emotion/react';

function QuestionTab() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const getCommentInfo = useCallback(() => {
    return request(`/api/comments?study-id=${id}`)
      .then((res) => {
        console.log('나는 댓글만 데이터', res.data.data);
        setComments(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getCommentInfo();
  }, []);

  return (
    <div css={container}>
      <InputComment getCommentInfof={getCommentInfo} />
      <ul>
        {comments.map((comment, idx) =>
          comment.commentStatus === 'COMMENT_ACTIVE' ? (
            <main key={comment.commentId}>
              <CommentSection
                content={comment.content}
                commentId={comment.commentId}
                getCommentInfof={getCommentInfo}
                member={comment.member}
                createdAt={comment.createdAt}
                modifiedAt={comment.modifiedAt}
              />
              <ReplySection
                replys={comment.replyList}
                getCommentInfof={getCommentInfo}
              />
            </main>
          ) : (
            <div key={comment.commentId}>
              <DeletedComment key={idx} />
              <ReplySection
                replys={comment.replyList}
                getCommentInfof={getCommentInfo}
              />
            </div>
          )
        )}
      </ul>
    </div>
  );
}

export default QuestionTab;

const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;

  @media all and (max-width: 768px) {
    padding: 0px;
  }
`;
