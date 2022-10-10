import { css } from '@emotion/react';
import { mypageOwnerAtom } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

const Card = css`
  width: 250px;
  height: 250px;
  margin-bottom: 4rem;
  border-radius: 10px;
  box-shadow: 4px 8px 5px -2px rgb(0 0 0 /25%);
  transition: all 0.1s linear;
  &:hover {
    transform: translateY(-1rem);
  }
`;

const ImageContainer = css`
  width: 100%;
  height: 60%;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
`;

const Content = css`
  display: flex;
  height: 40%;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: space-around;
`;

const Summary = css`
  font-size: 1.2rem;
`;

const DivideLine = css`
  border: 0;
  height: 1px;
  background: #d1d1d1;
`;

const NameAndCapacity = css`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  .evalueSign {
    display: flex;
  }
`;

const Sign = css`
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  color: #0b6ff2;
  position: relative;
  left: 5px;
`;

function StudyCard({ studyData, boxRef }) {
  const owner = useRecoilValue(mypageOwnerAtom);
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    if (owner.memberId === studyData.teamLeaderId) {
      setIsLeader(true);
    }
  }, []);
  return (
    <div css={Card} ref={boxRef ? boxRef : null}>
      <div css={ImageContainer}>
        <img src={studyData.image} alt="스터디 대표 사진" />
      </div>
      <div css={Content}>
        <div css={Summary}>
          {studyData.summary.length > 20
            ? `${studyData.summary.slice(0, 20)}...`
            : studyData.summary}
        </div>
        <hr css={DivideLine} />

        <div css={NameAndCapacity}>
          <div className="evalueSign">
            <span>{studyData.teamName}</span>
            {studyData.studyStatus === 'STUDY_COMPLETE' &&
              studyData.evaluationStatus === 'BEFORE_EVALUATION' && (
                <div css={Sign}>후기 작성</div>
              )}
          </div>
          {isLeader && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#0b6ff2"
              className="crown"
            >
              <path d="M5 19h14v3h-14v-3zm17-12c-1.326 0-2.294 1.272-1.924 2.54.611 2.091-6.357 4.068-7.386-1.604-.262-1.444.021-1.823.728-2.532.359-.36.582-.855.582-1.404 0-1.104-.896-2-2-2s-2 .896-2 2c0 .549.223 1.045.582 1.403.706.71.989 1.089.728 2.532-1.029 5.675-7.996 3.694-7.386 1.604.37-1.267-.598-2.539-1.924-2.539-1.104 0-2 .896-2 2 0 1.22 1.082 2.149 2.273 1.98 1.635-.23 2.727 4.372 2.727 6.02h14c0-1.65 1.092-6.25 2.727-6.019 1.191.168 2.273-.761 2.273-1.981 0-1.104-.896-2-2-2z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
