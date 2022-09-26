import { css } from '@emotion/react';
import Button from './Button';

const Container = css`
  position: fixed;
  width: 100vw;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 5px 2px -2px rgba(0, 0, 0, 0.25);
  z-index: 3;
`;

function Header() {
  return (
    <header css={Container}>
      <div
        css={css`
          display: flex;
          max-width: 1200px;
          height: 100%;
          margin: 0 auto;
          justify-content: space-between;
        `}
      >
        {/* 왼쪽 컨테이너 */}
        <div
          css={css`
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <div
            css={css`
              height: 100%;
            `}
          >
            <img
              src="/MoccoLogo.jpeg"
              alt="mocco_logo"
              css={css`
                height: 100%;
              `}
            />
          </div>
          <Button text={'스터디 찾기'} type={'header_skyblue'} />
          <Button text={'마이 페이지'} type={'header_skyblue'} />
        </div>
        {/* 오른쪽 컨테이너 */}
        <div
          css={css`
            display: inline-flex;
            align-items: center;
          `}
        >
          <Button text={'로그인'} type={'small_blue'} />
        </div>
      </div>
    </header>
  );
}

export default Header;
