import ReplyItem from './ReplyItem';
import { css } from '@emotion/react';

function ReplySection({ replys, getCommentInfof }) {
  return (
    <div>
      {replys.map((reply, idx) =>
        reply.replyStatus === 'REPLY_ACTIVE' ? (
          <div key={reply.replyId}>
            <ReplyItem
              reply={reply}
              getCommentInfof={getCommentInfof}
              member={reply.member}
              createdAt={reply.createdAt}
              modifiedAt={reply.modifiedAt}
            />
          </div>
        ) : (
          <section css={main} key={reply.replyId}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="#0b6ff2"
              className="bi bi-arrow-return-right"
              viewBox="0 0 16 16"
              css={arrow}
            >
              <path
                fillRule="evenodd"
                d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
              />
            </svg>
            <div key={idx} css={mainContainer}>
              <div css={container}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  width="60"
                  height="60"
                  stroke="#a4a4a4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <div className="delete_text">삭제된 댓글입니다</div>
              </div>
            </div>
          </section>
        )
      )}
    </div>
  );
}

export default ReplySection;

const main = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const arrow = css`
  margin-left: 20px;
  margin-top: 10px;

  @media all and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const mainContainer = css`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;

const container = css`
  width: 99%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  height: 170px;
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 7px 3px rgb(0 0 0 / 10%);

  .delete_text {
    color: #a4a4a4;
    font-weight: 500;
  }

  @media all and (max-width: 768px) {
    width: 96%;
    height: 145px;

    svg {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }

    .delete_text {
      font-size: 15px;
    }
  }
`;
