import { useState } from 'react';
import { css } from '@emotion/react';

const numberSpace = css`
  width: 68px;
`;
export const CountUp = ({ number }) => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return <div css={numberSpace}>{!isLoading && <div>{number}%</div>}</div>;
};
