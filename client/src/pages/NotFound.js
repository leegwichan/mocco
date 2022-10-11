import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../asset/좌절하는사람.png';

function NotFound() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1);
      if (count === 1) {
        navigate(-1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);
  return (
    <div
      css={css`
        display: flex;
        width: 100vw;
        height: calc(100vh - 4rem);
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          font-size: 2rem;
          text-align: center;
        `}
      >
        <img src={notFoundImage} alt="404 not found" />
        <div>존재하지 페이지 입니다.</div>
        <div>{count}초 뒤 이전 화면으로 돌아갑니다.</div>
      </div>
    </div>
  );
}

export default NotFound;
