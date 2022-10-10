import { css } from '@emotion/react';
import { useState } from 'react';
const RatingContainer = css`
  display: flex;
  text-align: center;
  margin: 13px 0px;
  .inactive {
    color: #999999;
  }
  .active {
    color: #f6d01a;
  }
`;

function Star({ member, fnc }) {
  const ArrayIndexes = [1, 2, 3, 4, 5];
  const [ratingIndex, setRatingIndex] = useState(0);
  fnc(ratingIndex, member);
  return (
    <div css={RatingContainer}>
      {ArrayIndexes.map((idx, index) => (
        <svg
          key={`rating_${index}`}
          className={idx <= ratingIndex ? 'active' : 'inactive'}
          onClick={() => setRatingIndex(idx)}
          xmlns="http://www.w3.org/2000/svg"
          fill={idx <= ratingIndex ? '#f6d01a' : '#999999'}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export default Star;
