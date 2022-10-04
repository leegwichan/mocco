import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api/index';
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { userInfoState, singleStudyState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useInputValid } from '../hooks/useInputValid';

function ReplyItem({ reply, getCommentInfof, member, createdAt, modifiedAt }) {
  const userInfo = useRecoilValue(userInfoState);
  const studyInfo = useRecoilValue(singleStudyState);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const { value, setIsValid, handleChange, handleClick } = useInputValid({
    initialvalues: reply.content,
    onClick: () => {
      editHandler();
    },
  });

  const deleteHandler = (e) => {
    e.preventDefault();
    return request
      .delete(`/api/replies/${reply.replyId}`)
      .then(() => getCommentInfof());
  };

  const editOpenHandler = () => {
    setIsEditOpen(true);
  };

  const editHandler = () => {
    return request
      .patch(`/api/replies/${reply.replyId}`, {
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
    <main css={main}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="#0b6ff2"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
        />
      </svg>
      <section css={container}>
        <div className="reply_box">
          <div
            css={profile}
            role="presentation"
            onClick={() =>
              userInfo !== null && navigate(`/main/${member.memberId}`)
            }
          >
            <img src={member.profileImage} alt="프로필 이미지" css={image} />
            <span className="main_link">{member.nickname}</span>
            {userInfo !== null &&
            userInfo.memberId === studyInfo.member.memberId ? (
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
            {reply.content}
            {modifiedAt !== createdAt ? <span css={edited}>수정됨</span> : null}
          </div>
          <div className="button_container">
            <span className="day">
              {createdAt !== modifiedAt ? modifiedAt : createdAt}
            </span>
            {userInfo !== null && userInfo.memberId === member.memberId && (
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
          <div css={editContainer}>
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
          </div>
        )}
      </section>
    </main>
  );
}

export default ReplyItem;

const main = css`
  display: flex;
  justify-content: space-between;
  width: 100%;

  svg {
    margin-left: 20px;
    margin-top: 10px;

    @media all and (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
  }
`;

const container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  word-break: break-all;
  flex-grow: 1;

  .reply_box {
    width: 99%;
    margin-bottom: 30px;
    border-radius: 15px;
    box-shadow: 0px 0px 7px 3px rgb(0 0 0 / 10%);
    padding: 20px;
    font-size: 20px;

    .main_link {
      color: black;
      &:hover {
        cursor: pointer;
        color: #066ff2;
      }
    }

    @media all and (max-width: 768px) {
      font-size: 15px;
      width: 96%;
      padding: 10px 20px;
    }
  }

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
    margin-top: 13px;
    margin-right: 10px;
    font-size: 15px;
    color: #999999;

    @media all and (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const edited = css`
  margin-left: 20px;
  font-size: 12px;
  color: #999999;
`;

const editContainer = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 99%;

  @media all and (max-width: 768px) {
    width: 95%;
  }

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
