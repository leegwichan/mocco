import Star from './Star';
import { css } from '@emotion/react';

const Date = css`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;
function Evaluation() {
  return (
    <div>
      <div css={Date}>평가기간</div>
      <Star />
    </div>
  );
}

export default Evaluation;

//스터디원 수만큼 Star 컴포넌트를 map
