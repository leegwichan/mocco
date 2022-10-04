import { css } from '@emotion/react';

function DeletedComment() {
  return (
    <div css={container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        width="60"
        height="60"
        stroke="#a4a4a4"
        className="delete"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
      <div
        css={css`
          color: #a4a4a4;
          font-weight: 500;
        `}
      >
        삭제된 댓글입니다
      </div>
    </div>
  );
}

export default DeletedComment;

const container = css`
  height: 170px;
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 7px 3px rgb(0 0 0 / 10%);
  padding: 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 768px) {
    font-size: 15px;
    height: 145px;

    .delete {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }
  }
`;
