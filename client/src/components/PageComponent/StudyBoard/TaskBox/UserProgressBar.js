import { useRef, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import 달리는사람 from '../../../../asset/달리는사람.png';
import 좌절하는사람 from '../../../../asset/좌절하는사람.png';
import 달리는괴물 from '../../../../asset/달리는괴물.png';

import Character from '../../../Common/Character';

function UserProgressBar({ taskList, total, select, expiredTaskCount }) {
  const [endTask, setEndTask] = useState(0);
  const bar = useRef(null);
  const chaBar = useRef(null);
  const moccoBar = useRef(null);

  useEffect(() => {
    const arr = taskList.filter((i) => i.taskCheck.taskChecked === true);
    setEndTask(arr.length);
    bar.current.style.width = (endTask / total) * 100 + '%';
    chaBar.current.style.width = (endTask / total) * 100 + '%';
    moccoBar.current.style.width = (expiredTaskCount / total) * 100 + '%';

    // moccoBar.current.style.width = (expiredTaskCount / total) * 100 + '%';
  }, [taskList, select, endTask]);
  console.log('total' + total);
  console.log('endTask' + endTask);
  console.log('expiredTaskCount' + expiredTaskCount);

  return (
    <div css={Total}>
      <section className="character" css={CharacterProgress}>
        <div>
          <div className="characContainer">
            <div className="characBar" ref={chaBar}></div>
            {endTask >= expiredTaskCount ? (
              <Character
                src={달리는사람}
                alt="달려가는 사용자 캐릭터"
                width="10vw"
                max_width={'75px'}
              />
            ) : (
              <Character
                src={좌절하는사람}
                alt="좌절하는 사용자 캐릭터"
                width="10vw"
                max_width={'75px'}
              />
            )}
          </div>
          <div className="characContainer">
            <div className="characBar" ref={moccoBar}></div>
            <Character
              className="mocco"
              src={달리는괴물}
              width="11vw"
              max_width={'90px'}
            />
          </div>
        </div>
      </section>

      <div css={Container}>
        <div css={Progress} ref={bar}></div>
        <div className="number">
          {Math.round((endTask / total) * 100) + '%'}
        </div>
      </div>
    </div>
  );
}

export default UserProgressBar;

const Total = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media all and (min-width: 767px) {
    .character {
      display: none;
    }
  }
`;

const Container = css`
  width: 40vw;
  max-width: 535px;
  margin: 0px 15px;
  height: 45px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  .number {
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    font-size: 20px;
    font-weight: 600;
    margin-left: 5px;
    margin-right: 10px;
    color: #0b6ff2;
  }
  @media all and (max-width: 767px) {
    width: 70vw;
    max-width: 800px;
    margin-bottom: 10%;
    height: 40px;
  }
`;

const Progress = css`
  height: 100%;
  background: #0f6ad5;
  border-radius: 10px;
  margin-right: 5px;
`;

const CharacterProgress = css`
  position: relative;
  margin-right: 55px;
  width: 55vw;
  max-width: 800px;

  .characContainer {
    display: flex;
    align-items: center;
    height: 0px;
  }

  .characBar {
    background: #0f6ad5;
    border-radius: 10px;
    margin-right: -10%;
  }
`;
