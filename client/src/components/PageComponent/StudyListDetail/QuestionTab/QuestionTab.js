import { useState, useEffect } from 'react';
import InputComment from './InputComment';
import request from '../../../../api';
import CommentSection from './CommentSection';
import DeletedComment from '../DeletedComment';
import { useParams } from 'react-router-dom';

function QuestionTab() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const getCommentInfo = () => {
    return request(`/api/comments?study-id=${id}`)
      .then((res) => {
        console.log('나는 댓글만 데이터', res);
        setComments(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCommentInfo();
  }, [comments.length]);

  return (
    <div>
      <InputComment />
      <ul>
        {comments.map((comment, idx) =>
          comment.commentStatus === 'COMMENT_ACTIVE' ? (
            <div key={comment.commentId}>
              <CommentSection
                nickname={comment.member.nickname}
                content={comment.content}
                commentId={comment.commentId}
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
