import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import React from 'react'; // eslint-disable-line no-unused-vars

const Card = css`
  flex-shrink: 0; //찌그러지지 않게
  width: 250px;
  height: 250px;
  /* margin-right: 30px; */
  margin-bottom: 4rem;
  border-radius: 10px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  transition: all 0.1s linear;
  &:hover {
    transform: translateY(-1rem);
  }
`;

const Slides_Wraper = css`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  height: 250px;
  overflow: hidden;
  /* border: 1px solid red;
  transition: transform(0.5s);
  height: 100%; */
`;

const Slides = css`
  position: absolute;
  left: 0;
  top: 0;
  transition: left 0.5s ease-out;
  li:not(:last-child) {
    float: left;
    margin-right: 50px;
  }
  /* display: flex;
  overflow: hidden;
  transform: translate(-4vw); */
`;

const controls = css`
  text-align: center;
  button {
    background-color: aliceblue;
    padding: 0 20px;
    margin: 0px 10px;
  }
`;
function Carousel({ studyList }) {
  //main > progressList > carousel로 배열 받아와야함
  const [currentIdx, setCurrentIdx] = useState(0);
  const slides = useRef(null);
  const slide = useRef(null);
  const TOTAL_SLIDES = 7; //여러개 로드하기 위해 배열 개수 임의로 설정. 실제 데이터 들어오면'studyList.length'로 바꾸기

  if (studyList) {
    console.log(studyList.length);
    const slideWidth = 250;
    const slideMargin = 30;
    slides.current.style.width =
      (slideWidth + slideMargin) * TOTAL_SLIDES - slideMargin + 'px';
  }

  function moveSlide(num) {
    slides.current.style.left = -num * 280 + 'px';
    setCurrentIdx(num);
  }

  function goNext() {
    if (currentIdx < TOTAL_SLIDES - 4) {
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
      moveSlide(TOTAL_SLIDES - 4);
    }
  }

  return (
    <>
      <div css={Slides_Wraper}>
        <ul css={Slides} ref={slides}>
          <li css={Card} ref={slide}>
            1
          </li>
          <li css={Card} ref={slide}>
            2
          </li>
          <li css={Card} ref={slide}>
            3
          </li>
          <li css={Card} ref={slide}>
            4
          </li>
          <li css={Card} ref={slide}>
            5
          </li>
          <li css={Card} ref={slide}>
            6
          </li>
          <li css={Card} ref={slide}>
            7
          </li>
        </ul>
      </div>
      <p css={controls}>
        <button className="prev" onClick={goPrev}>
          prev
        </button>
        <button className="next" onClick={goNext}>
          next
        </button>
      </p>
    </>
  );
}

export default Carousel;
