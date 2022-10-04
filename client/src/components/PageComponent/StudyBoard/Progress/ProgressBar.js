import { useRef, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Character from '../../../Common/Character';
import 달리는사람자신파랑 from '../../../../asset/달리는사람자신파랑.png';
import 달리는사람 from '../../../../asset/달리는사람.png';
import 달리는괴물 from '../../../../asset/달리는괴물.png';
import 좌절하는사람자신파랑 from '../../../../asset/좌절하는사람자신파랑.png';
import 좌절하는사람 from '../../../../asset/좌절하는사람.png';

function ProgressBar({
  who,
  totalTask,
  endTask,
  mocco,
  selectedId,
  characterMemberId,
}) {
  const [isSame, setIsSame] = useState(false);

  const bar = useRef(null);

  useEffect(() => {
    setIsSame(false);
    console.log('캐릭터 ' + characterMemberId);
    console.log('선택된 유저 캐 ' + selectedId);
    if (characterMemberId === selectedId) {
      setIsSame(true);
    }
    // console.log('나는 셀렉트야', selectedId);
    // console.log(endTask);
    bar.current.style.width = (endTask / totalTask) * 100 + '%';
  }, [selectedId, endTask]);

  return (
    <section>
      <div css={Container} type="button" role="presentation" key={selectedId}>
        <div css={Progress} ref={bar}></div>
        <div css={Charac}>
          {who === 'character' && endTask < mocco && (
            <div>
              <Character
                src={isSame ? 좌절하는사람자신파랑 : 좌절하는사람}
                alt={isSame ? '좌절하는 사용자 캐릭터' : '좌절하는 캐릭터'}
                width="10vw"
                max_width={'100px'}
              />
            </div>
          )}
          {who === 'character' && endTask >= mocco && (
            <Character
              src={isSame ? 달리는사람자신파랑 : 달리는사람}
              alt={isSame ? '달려가는 사용자 캐릭터' : '달려가는 캐릭터'}
              width="10vw"
              max_width={'100px'}
            />
          )}
        </div>
        <div css={Mocco}>
          {who === 'mocco' && (
            <Character
              className="괴물"
              src={달리는괴물}
              width="12vw"
              max_width={'150px'}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ProgressBar;

const Container = css`
  width: 78vw;
  max-width: 970px;
  height: 10px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  animation: progressHeight 3s ease-in-out forwards;
  @keyframes progressHeight {
    0% {
      height: 0px;
    }
    20% {
      height: 40px;
    }
    40% {
      height: 0px;
    }
    60% {
      height: 50px;
    }
    80% {
      height: 0px;
    }
  }
`;
const Progress = css`
  margin-right: -7%;
  animation: progress 3s ease-in-out forwards;
  @keyframes progress {
    0% {
      width: 0;
    }
  }
`;

const Charac = css`
  margin-right: -3%;
`;

const Mocco = css``;
