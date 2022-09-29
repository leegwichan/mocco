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
  taskMemberId,
  selectedMemberId,
}) {
  const [isSame, setIsSame] = useState(false);

  const bar = useRef(null);
  // console.log(who);
  // console.log('엔드' + endTask);
  // console.log(totalTask);

  useEffect(() => {
    if (taskMemberId === selectedMemberId) {
      setIsSame(true);
    }
    bar.current.style.width = (endTask / totalTask) * 100 + '%';
  }, []);

  return (
    <section>
      <div css={Container} type="button" role="presentation">
        <div css={Progress} ref={bar}></div>
        <div css={Charac}>
          {who === 'character' && endTask < mocco && (
            <div>
              <Character
                src={isSame ? 좌절하는사람자신파랑 : 좌절하는사람}
                alt={isSame ? '좌절하는 사용자 캐릭터' : '좌절하는 캐릭터'}
                width="100px"
              />
            </div>
          )}
          {who === 'character' && endTask >= mocco && (
            <Character
              src={isSame ? 달리는사람자신파랑 : 달리는사람}
              alt={isSame ? '달려가는 사용자 캐릭터' : '달려가는 캐릭터'}
              width="100px"
            />
          )}
        </div>
        <div css={Mocco}>
          {who === 'mocco' && (
            <Character
              className="괴물"
              src={달리는괴물}
              alt="괴물캐릭터"
              width="150px"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ProgressBar;

const Container = css`
  width: 960px;
  height: 10px;
  display: flex;
  align-items: center;
  margin-left: 50px;
`;
const Progress = css`
  margin-right: -7%;
`;

const Charac = css`
  margin-right: -3%;
`;

const Mocco = css``;
