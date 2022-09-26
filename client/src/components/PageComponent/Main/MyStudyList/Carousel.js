import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import StudyCard from '../../StudyList/StudyCard';

const Container = css`
  display: flex;
  .icon {
    width: 40px;
    color: #4391f9;
    &:hover {
      color: #0b6ff2;
    }
  }
  .none {
    display: none;
  }
`;
const Slides_Wraper = css`
  width: 100%;
  max-width: 1000px;
  padding: 30px;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
`;

const Slides = css`
  position: relative;
  width: 100%;
  height: 250px;
  transition: left 0.5s ease-out;
  ul {
    display: flex;
  }
  li {
    float: left;
    margin-right: 100px;
  }
`;

function Carousel({ studyArr, status, clickHandler }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const slides = useRef(null);
  let length;
  if (studyArr) {
    length = studyArr.length;
  }
  useEffect(() => {
    const slideWidth = 250;
    const slideMargin = 100;
    slides.current.style.width =
      (slideWidth + slideMargin) * length - slideMargin + 'px';
  }, []);

  function moveSlide(num) {
    slides.current.style.left = -num * 350 + 'px';
    setCurrentIdx(num);
  }

  function goNext() {
    if (currentIdx < length - 3) {
      moveSlide(currentIdx + 1);
      console.log(currentIdx);
    } else {
      moveSlide(0);
    }
  }

  function goPrev() {
    if (currentIdx > 0) {
      moveSlide(currentIdx - 1);
    } else {
      moveSlide(length - 3);
    }
  }

  return (
    <div css={Container}>
      {studyArr && length < 4 ? null : (
        <svg
          onClick={goPrev}
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <div css={Slides_Wraper}>
        <div css={Slides} ref={slides}>
          <ul>
            {studyArr && status
              ? studyArr.map((studyData, idx) => (
                  <div
                    key={idx}
                    role="presentation"
                    onClick={() => clickHandler(studyData)}
                  >
                    <StudyCard studyData={studyData} />
                  </div>
                ))
              : studyArr.map((studyData, idx) => (
                  <div key={idx} role="presentation">
                    <StudyCard studyData={studyData} />
                  </div>
                ))}
          </ul>
        </div>
      </div>
      {studyArr && length < 4 ? null : (
        <svg
          onClick={goNext}
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
    </div>
  );
}

export default Carousel;
