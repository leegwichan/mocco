import { css } from '@emotion/react';
import Button from '../../../Common/Button';

function ProposaTab() {
  const handleConsole = () => {
    console.log('성공입니다');
  };
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;

        input {
          width: 900px;
          height: 40px;
          border: 1px solid #d1d1d1;
          border-radius: 5px;
        }
      `}
    >
      <input type="text" placeholder="신청을 위한 한 마디를 적어주세요" />
      <Button text={'삭제'} type={'big_blue'} onClick={handleConsole} />
    </div>
  );
}

export default ProposaTab;
