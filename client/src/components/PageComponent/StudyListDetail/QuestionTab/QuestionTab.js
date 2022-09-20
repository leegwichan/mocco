// import { useState, useEffect } from 'react';
import InputComment from './InputComment';
import { useRecoilValue } from 'recoil';
import { commentAtom } from '../../../../atom/atom';
import Comment from './CommentSection';

function QuestionTab() {
  // const [isEdit, setIsEdit] = useState(false);
  // const [isDelete, setIsDelete] = useState(false);
  const comments = useRecoilValue(commentAtom);

  return (
    <div>
      <InputComment />
      <ul>
        {comments &&
          comments.map((comment) => (
            <div key={comment.commentId}>
              <Comment
                nickname={comment.member.nickname}
                content={comment.content}
              />
            </div>
          ))}
      </ul>
    </div>
  );
}

export default QuestionTab;
