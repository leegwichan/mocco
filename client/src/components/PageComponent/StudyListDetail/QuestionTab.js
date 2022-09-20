import { css } from '@emotion/react';

function QuestionTab() {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;

        input {
          width: 900px;
          height: 40px;
          border: 1px solid #d1d1d1;
          border-radius: 5px;
        }

        button {
          margin-left: 60px;
          width: 120px;
          height: 40px;
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          border: none;
          background-color: #0b6ff2;
          border-radius: 8px;
        }
      `}
    >
      <input type="text" placeholder="스터디에 대한 궁금한 점을 물어보세요" />
      <button>등록</button>
    </div>
  );
}

export default QuestionTab;
