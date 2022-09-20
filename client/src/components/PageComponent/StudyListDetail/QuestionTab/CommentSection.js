import { css } from '@emotion/react';
import Button from '../../../Common/Button';

function Comment({ nickname, content }) {
  return (
    <div
      css={css`
        width: 1080px;
        margin-bottom: 25px;
        border-radius: 15px;
        box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
        padding: 20px;
        font-size: 20px;
      `}
    >
      <div>
        <span>사진</span>
        <span
          css={css`
            margin: 0px 12px;
          `}
        >
          {nickname}
        </span>
      </div>
      <div
        css={css`
          margin-top: 16px;
        `}
      >
        {content}
      </div>
      <div
        css={css`
          margin-top: 16px;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Button type={'small_blue'} text={'답글'} />
        <Button type={'small_white'} text={'수정'} />
        <Button type={'small_grey'} text={'삭제'} />
      </div>
    </div>
  );
}

export default Comment;
