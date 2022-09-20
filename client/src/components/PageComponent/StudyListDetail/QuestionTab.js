import { css } from '@emotion/react';
import Button from '../../Common/Button';

function QuestionTab() {
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
      <input type="text" placeholder="스터디에 대한 궁금한 점을 물어보세요" />
      <Button type={'big_blue'} text={'등록'} />
    </div>
  );
}

export default QuestionTab;
