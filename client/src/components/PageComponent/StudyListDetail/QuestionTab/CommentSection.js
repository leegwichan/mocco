import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState, singleStudyState } from '../../../../atom/atom';
import { useNavigate } from 'react-router-dom';
import { useInputValid } from '../hooks/useInputValid';
import InputReply from './InputReply';

const CommentSection = ({
  content,
  commentId,
  getCommentInfof,
  member,
  createdAt,
  modifiedAt,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const studyInfo = useRecoilValue(singleStudyState);
  const navigate = useNavigate();
  const { value, setIsValid, handleChange, handleClick } = useInputValid({
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

  const editOpenHandler = () => {
    setIsEditOpen(true);
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
    <main>
      <div>
        <section css={container}>
          <div
            css={profile}
            role="presentation"
            onClick={() =>
              userInfo !== null && navigate(`/main/${member.memberId}`)
            }
          >
            <img src={member.profileImage} alt="프로필 이미지" css={image} />
            <span className="main_link">{member.nickname}</span>
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
            {modifiedAt !== createdAt ? <span css={edited}>수정됨</span> : null}
          </div>
          <div className="button_container">
            <span className="day">
              {createdAt !== modifiedAt ? modifiedAt : createdAt}
            </span>
            <Button
              type={'small_blue'}
              text={'답글'}
              onClick={() => setIsReplyOpen(true)}
            />
            {userInfo.memberId === member.memberId && (
              <>
                <Button
                  type={'small_white'}
                  text={'수정'}
                  onClick={editOpenHandler}
                />
                <Button
                  type={'small_grey'}
                  text={'삭제'}
                  onClick={deleteHandler}
                />
              </>
            )}
          </div>
        </section>
        {isEditOpen && (
          <section css={editContainer}>
            <textarea css={editInput} value={value} onChange={handleChange} />
            <div className="btn">
              <Button
                type={'small_white'}
                text={'완료'}
                onClick={handleClick}
              />
              <Button
                type={'small_grey'}
                text={'취소'}
                onClick={() => setIsEditOpen(false)}
              />
            </div>
          </section>
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
    </main>
  );
};

export default CommentSection;

const container = css`
  width: 100%;
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 7px 3px rgb(0 0 0 / 10%);
  padding: 20px;
  font-size: 20px;
  word-break: break-all;

  .button_container {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;

    @media all and (max-width: 768px) {
      button {
        width: 50px;
        height: 30px;
        margin-left: 7px;
        font-size: 13px;
      }
    }
  }

  .day {
    font-size: 15px;
    color: #999999;
    margin-top: 10px;
    margin-right: 10px;

    @media all and (max-width: 768px) {
      font-size: 12px;
    }
  }

  .main_link {
    color: black;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }

  @media all and (max-width: 768px) {
    font-size: 15px;
    padding: 10px 20px;
  }
`;

const edited = css`
  margin-left: 20px;
  font-size: 12px;
  color: #999999;
`;

const editContainer = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 30px;

  .btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    margin-top: 10px;

    @media all and (max-width: 768px) {
      button {
        width: 50px;
        height: 30px;
        margin-left: 7px;
        font-size: 13px;
      }
    }
  }
`;

const editInput = css`
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #d1d1d1;
  outline: none;
  resize: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const profile = css`
  display: flex;
  align-items: center;

  .main_link {
    color: black;
    margin: 12px;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }
`;

const image = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
