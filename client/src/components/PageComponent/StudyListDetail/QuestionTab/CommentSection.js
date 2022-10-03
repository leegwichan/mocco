import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState, singleStudyState } from '../../../../atom/atom';
import { Link } from 'react-router-dom';
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
    <div>
      <div>
        <div css={container}>
          <Link
            to={`/main/${member.memberId}`}
            css={css`
              text-decoration: none;
            `}
          >
            <div css={profile}>
              <img src={member.profileImage} alt="프로필 이미지" css={image} />
              <span className="main_link">{member.nickname}</span>
              {userInfo.memberId === studyInfo.member.memberId ? (
                <span>
                  <Button type="small_lightblue" text="스터디장" />
                </span>
              ) : null}
            </div>
          </Link>
          <div
            css={css`
              margin-top: 16px;
            `}
          >
            {content}
            {modifiedAt !== createdAt ? <span css={edited}>수정됨</span> : null}
          </div>
          <div className="button_container">
            <span className="day">{createdAt}</span>
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
        </div>
        {isEditOpen && (
          <div css={edit_container}>
            <input css={edit_input} value={value} onChange={handleChange} />
            <div css={btn_container}>
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
  box-shadow: 0px 0px 15px 3px rgb(0 0 0 / 10%);
  padding: 20px;
  font-size: 20px;
  word-break: break-all;

  .button_container {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }

  .day {
    font-size: 15px;
    color: #999999;
    margin-top: 10px;
    margin-right: 10px;
  }

  .main_link {
    color: black;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }
`;

const edited = css`
  margin-left: 20px;
  font-size: 12px;
  color: #999999;
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
