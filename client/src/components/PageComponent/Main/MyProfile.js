import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';

const roundImg = css`
  border: solid 1px black;
`;
function MyProfile() {
  return (
    <section>
      <div>사진</div>
      <div css={roundImg}>닉네임</div>
      <div>별</div>
      <div>깃헙버튼</div>
    </section>
  );
}

export default MyProfile;
