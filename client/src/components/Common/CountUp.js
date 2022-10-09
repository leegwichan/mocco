import { useState } from 'react';
import { css } from '@emotion/react';

const numberSpace = css`
  width: 68px;
`;
export const CountUp = ({ number }) => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
    console.log(isLoading);
  }, 3000);
  // let number;
  // setTimeout(() => {
  //   number = max;
  // }, 3000);

  // let current = max;
  // let number;
  // const handle = setInterval(() => {
  //   number = Math.ceil(max - current);
  //   if (current < 1) {
  //     clearInterval(handle);
  //   }

  //   const step = current / 10;

  //   current -= step;
  // }, 50);

  return <div css={numberSpace}>{!isLoading && <div>{number}%</div>}</div>;
};
