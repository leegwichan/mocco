import { css } from '@emotion/react';

const Container = css`
  width: 427px;
  height: 75px;
  background: #f0f8ff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
function Star() {
  return (
    <div css={Container}>
      <div>스터디원</div>
      <div>별</div>
    </div>
  );
}

export default Star;

//백엔드와 통신
