import { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState, singleStudyState } from '../../../../atom/atom';

const CommentSection = ({ content, commentId, getCommentInfof }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [reply, setReply] = useState('');
  const userInfo = useRecoilValue(userInfoState);
  const studyInfo = useRecoilValue(singleStudyState);

  const deleteHandler = () => {
    return request.delete(`/api/comments/${commentId}`).then(() => {
      getCommentInfof();
    });
  };

  const editHandler = (e) => {
    e.preventDefault();
    return request
      .patch(`/api/comments/${commentId}`, {
        content: editContent,
      })
      .then(() => {
        setIsEditOpen(false);
        getCommentInfof();
      })
      .catch((err) => console.log(err));
  };

  const replyInfo = {
    memberId: userInfo.memberId,
    commentId: commentId,
    content: reply,
  };

  const replyHandler = () => {
    return request.post(`/api/replies`, replyInfo).then(() => {
      setReply('');
      getCommentInfof();
    });
  };

  return (
    <div>
      <div>
        {!isEditOpen ? (
          <div css={container}>
            <div>
              <span>사진</span>
              <span
                css={css`
                  margin: 0px 12px;
                `}
              >
                {userInfo.nickname}
              </span>
              {userInfo.memberId === studyInfo.member.memberId ? (
                <span>
                  <Button type="small_lightblue" text="스터디장" />
                </span>
              ) : null}
            </div>
            <div
              css={css`
                margin-top: 16px;
              `}
            >
              {content}
            </div>
            <div className="button_container">
              <Button
                type={'small_blue'}
                text={'답글'}
                onClick={() => setIsReplyOpen(true)}
              />
              <Button
                type={'small_white'}
                text={'수정'}
                onClick={() => setIsEditOpen(true)}
              />
              <Button
                type={'small_grey'}
                text={'삭제'}
                onClick={deleteHandler}
              />
            </div>
          </div>
        ) : (
          <div css={edit_container}>
            <textarea
              css={edit_input}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div css={btn_container}>
              <Button
                type={'small_white'}
                text={'완료'}
                onClick={editHandler}
              />
              <Button
                type={'small_grey'}
                text={'취소'}
                onClick={() => setIsEditOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
      {isReplyOpen && (
        <div css={reply_input}>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="답글을 입력하세요"
          />
          <div className="button_container">
            <Button
              type={'small_blue'}
              text={'등록'}
              onClick={() => {
                setIsReplyOpen(false);
                replyHandler();
              }}
            />
            <Button
              type={'small_grey'}
              text={'취소'}
              onClick={() => setIsReplyOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

CommentSection.displayName = 'CommentSection';

export default CommentSection;

const container = css`
  width: 1080px;
  margin-bottom: 25px;
  border-radius: 15px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  padding: 20px;
  font-size: 20px;

  .button_container {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
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
  }
  .button_container {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    margin-top: 10px;
  }
`;

const edit_container = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const edit_input = css`
  width: 1080px;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #d1d1d1;
`;

const btn_container = css`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  margin-top: 10px;
`;
