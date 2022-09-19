import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const container = css`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const roundImg = css`
  border-radius: 100%;
  max-width: 80%;
`;
const name = css`
  font-size: 20px;
`;
function MyProfile({ img, nickname, evaluation, githubId }) {
  return (
    <section css={container}>
      <img
        src={
          img === null
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU'
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU'
        }
        alt={'프로필 이미지'}
        css={roundImg}
      />
      <div css={name}>{nickname}</div>
      <div>평점{evaluation}</div>
      <button>깃헙버튼{githubId}</button>
    </section>
  );
}

export default MyProfile;
