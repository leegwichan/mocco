import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';

function Landing() {
  const userInfo = useRecoilValue(userInfoState);
  console.log('userInfo', userInfo);
  return (
    <div
      css={css`
        margin-top: 70px;
      `}
    >
      Landing
    </div>
  );
}

export default Landing;
