import { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState, singleStudyState } from '../../../../atom/atom';
import { Link } from 'react-router-dom';
import { useInputValid } from '../hooks/useInputValid';
import InputReply from './InputReply';

const CommentSection = ({ content, commentId, getCommentInfof, nickname }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const studyInfo = useRecoilValue(singleStudyState);
  const { value, errMessage, isValid, setIsValid, handleChange, handleClick } =
    useInputValid({
      initialvalues: content,
      onClick: () => {
        editHandler();
      },
    });

  const deleteHandler = (e) => {
    e.preventDefault();
    return request.delete(`/api/comments/${commentId}`).then(() => {
      getCommentInfof();
    });
  };

  const editHandler = () => {
    return request
      .patch(`/api/comments/${commentId}`, {
        content: value,
      })
      .then(() => {
        setIsEditOpen(false);
        setIsValid(true);
        getCommentInfof();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
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
            <Button type={'small_grey'} text={'삭제'} onClick={deleteHandler} />
          </div>
        </div>
        {isEditOpen && (
          <div css={edit_container}>
            <input css={edit_input} value={value} onChange={handleChange} />
            {errMessage && (
              <div
                css={css`
                  color: red;
                  margin-top: 10px;
                `}
              >
                {errMessage}
              </div>
            )}
            <div css={btn_container}>
              <Button
                type={'small_white'}
                text={'완료'}
                onClick={handleClick}
                disabled={!isValid}
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
        <InputReply
          setIsReplyOpen={setIsReplyOpen}
          commentId={commentId}
          userInfo={userInfo}
          getCommentInfof={getCommentInfof}
        />
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
