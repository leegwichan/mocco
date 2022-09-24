// 페이지 이동 시, 항상 페이지 맨 위로 스크롤시키는 컴포넌트
// index.js에서 선언,꼭 라우터 안에 선언하기

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
