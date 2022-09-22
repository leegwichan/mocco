import { useState, useEffect, useCallback } from 'react';
import InputComment from './InputComment';
import request from '../../../../api';
import CommentSection from './CommentSection';
import DeletedComment from './DeletedComment';
import { useParams } from 'react-router-dom';
import ReplySection from './ReplySection';

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
    <div>
      <InputComment getCommentInfof={getCommentInfo} />
      <ul>
        {comments.map((comment, idx) =>
          comment.commentStatus === 'COMMENT_ACTIVE' ? (
            <div key={comment.commentId}>
              <CommentSection
                content={comment.content}
                commentId={comment.commentId}
                getCommentInfof={getCommentInfo}
              />
              <ReplySection
                replys={comment.replyList}
                getCommentInfof={getCommentInfo}
              />
            </div>
          ) : (
            <DeletedComment key={idx} />
          )
        )}
      </ul>
    </div>
  );
}

export default QuestionTab;
