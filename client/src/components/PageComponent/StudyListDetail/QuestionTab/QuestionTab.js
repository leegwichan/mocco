// import { useState, useEffect } from 'react';
import InputComment from './InputComment';
import { useRecoilValue } from 'recoil';
import { commentAtom } from '../../../../atom/atom';
import CommentSection from './CommentSection';
import DeletedComment from '../DeletedComment';

function QuestionTab() {
  // const [isEdit, setIsEdit] = useState(false);
  // const [isDelete, setIsDelete] = useState(false);
  const comments = useRecoilValue(commentAtom);

  return (
    <div>
      <InputComment />
      <ul>
        {comments.map((comment) =>
          comment.commentStatus === 'COMMENT_ACTIVE' ? (
            <div key={comment.commentId}>
              <CommentSection
                nickname={comment.member.nickname}
                content={comment.content}
                id={comment.commentId}
              />
            </div>
          ) : (
            <DeletedComment />
          )
        )}
      </ul>
    </div>
  );
}

export default QuestionTab;
