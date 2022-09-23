import { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState, singleStudyState } from '../../../../atom/atom';
import { Link } from 'react-router-dom';

const CommentSection = ({ content, commentId, getCommentInfof, nickname }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editErrMessage, setEditErrMessage] = useState('');
  const [replyErrMessage, setReplyErrMessage] = useState('');
  const [isEditValid, setIsEditValid] = useState(false);
  const [isReplyValid, setIsReplyValid] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const studyInfo = useRecoilValue(singleStudyState);

  const deleteHandler = (e) => {
    e.preventDefault();
    return request.delete(`/api/comments/${commentId}`).then(() => {
      getCommentInfof();
    });
  };

  const editHandler = (e) => {
    e.preventDefault();
    if (editContent === '') {
      setEditErrMessage('내용을 입력해주세요');
      setIsEditValid(false);
    } else if (editContent.length >= 300) {
      setEditErrMessage('300자 미만으로 입력해주세요');
      setIsEditValid(false);
    } else {
      setEditErrMessage('');
      return request
        .patch(`/api/comments/${commentId}`, {
          content: editContent,
        })
        .then(() => {
          setIsEditOpen(false);
          setIsEditValid(true);
          getCommentInfof();
        })
        .catch((err) => console.log(err));
    }
  };

  const replyInfo = {
    memberId: userInfo.memberId,
    commentId: commentId,
    content: replyContent,
  };

  const replyHandler = () => {
    if (replyContent === '') {
      setReplyErrMessage('내용을 입력해주세요');
      setIsReplyValid(false);
    } else if (replyContent.length >= 300) {
      setReplyErrMessage('300자 미만으로 입력해주세요');
      setIsReplyValid(false);
    } else {
      setReplyErrMessage('');
      setReplyContent('');
      return request.post(`/api/replies`, replyInfo).then(() => {
        setIsReplyOpen(false);
        setIsReplyValid(true);
        getCommentInfof();
      });
    }
  };

  return (
    <div>
      <div>
        {!isEditOpen ? (
          <div css={container}>
            <div>
              <Link
                to={`/main/${nickname}`}
                css={css`
                  text-decoration: none;
                `}
              >
                <span className="main_link">사진</span>
              </Link>

              <Link
                to={`/main/${nickname}`}
                css={css`
                  text-decoration: none;
                `}
              >
                <span
                  className="main_link"
                  css={css`
                    margin: 12px;
                  `}
                >
                  {nickname}
                </span>
              </Link>
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
            {editErrMessage && (
              <div
                css={css`
                  color: red;
                  margin-top: 10px;
                `}
              >
                {editErrMessage}
              </div>
            )}
            <div css={btn_container}>
              <Button
                type={'small_white'}
                text={'완료'}
                onClick={editHandler}
                disabled={!isEditValid}
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
        <div>
          <div css={reply_input}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글을 입력하세요"
            />
            {replyErrMessage && (
              <div
                css={css`
                  color: red;
                  margin-top: 10px;
                  margin-right: 850px;
                `}
              >
                {replyErrMessage}
              </div>
            )}
            <div className="button_container">
              <Button
                type={'small_blue'}
                text={'등록'}
                disabled={!isReplyValid}
                onClick={() => {
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
  margin-top: 30px;
  border-radius: 15px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  padding: 20px;
  font-size: 20px;
  word-break: break-all;

  .button_container {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }

  .main_link {
    color: black;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
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
