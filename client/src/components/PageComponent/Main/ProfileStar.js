import { css } from '@emotion/react';

const Star = css`
  display: flex;
  margin: -5px 0px;
`;

function ProfileStar({ evaluation }) {
  let arr = [];
  const star = `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="#FFC700"
  width="27"
  height="27"
><path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
  />
</svg>`;

  const halfStar = `<svg
  width="27"
  height="27"
  viewBox="0 0 32 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11.45 11.22L1.28 12.7L8.64 19.87L6.9 30L16 25.22V2L11.45 11.22Z"
    fill="#FFC700"
  />
</svg>`;

  for (let i = evaluation; i >= 0; i--) {
    if (i >= 1) arr.push(star);
    if (i < 1 && i % 1 !== 0) {
      arr.push(halfStar);
    }
  }
  let result = arr.join('');

  return (
    <div>
      <div css={Star} dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
}

export default ProfileStar;
