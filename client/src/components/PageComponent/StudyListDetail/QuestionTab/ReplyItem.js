import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api/index';
import { useState } from 'react';
import { userInfoState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';

function ReplyItem({ reply }) {
  const userInfo = useRecoilValue(userInfoState);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);

  const deleteHandler = () => {
    return request
      .delete(`/api/replies/${reply.replyId}`)
      .then(() => window.location.reload());
  };

  const editHandler = () => {
    return request
      .patch(`/api/replies/${reply.replyId}`, {
        content: editContent,
      })
      .then(() => {
        // setIsEditOpen(false);
        window.location.reload();
      });
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-end;
      `}
    >
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
          </div>
          <div
            css={css`
              margin-top: 16px;
            `}
          >
            {reply.content}
          </div>
          <div
            css={css`
              margin-top: 16px;
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button
              type={'small_white'}
              text={'수정'}
              onClick={() => setIsEditOpen(true)}
            />
            <Button
              type={'small_grey'}
              text={'삭제'}
              onClick={() => deleteHandler()}
            />
          </div>
        </div>
      ) : (
        <div css={edit_container}>
          <textarea
            css={edit_input}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />{' '}
          <div css={btn_container}>
            <Button type={'small_white'} text={'완료'} onClick={editHandler} />
            <Button
              type={'small_grey'}
              text={'취소'}
              onClick={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReplyItem;

const container = css`
  width: 990px;
  margin-bottom: 25px;
  border-radius: 15px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  padding: 20px;
  font-size: 20px;
`;

const edit_container = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const edit_input = css`
  width: 990px;
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
