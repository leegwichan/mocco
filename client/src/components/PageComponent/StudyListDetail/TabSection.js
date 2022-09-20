import { css } from '@emotion/react';
import { useState } from 'react';
import ProposalTab from './ProposaTab';
import QuestionTab from './QuestionTab';

function TabSection() {
  const [currentTab, SetCurrentTab] = useState(0);

  const tabList = [
    { name: '질답 게시판', content: <QuestionTab /> },
    { name: '신청 게시판', content: <ProposalTab /> },
  ];

  const selectTabHandler = (idx) => {
    SetCurrentTab(idx);
  };

  return (
    <div
      css={css`
        padding-bottom: 100px;
      `}
    >
      <ul
        css={css`
          display: flex;
          font-size: 17px;
          font-weight: 500;

          .tab {
            padding: 17px;
            border: 1px solid #d1d1d1;
            border-radius: 10px 10px 0 0;
            border-bottom: none;
          }

          .tab:hover,
          .focused {
            color: #0b6ff2;
            border-top: 10px solid #0b6ff2;
            padding-top: 8px;
          }
        `}
      >
        {tabList.map((el, idx) => (
          <li
            key={idx}
            role="presentation"
            className={currentTab === idx ? 'tab focused' : 'tab not_focused'}
            onClick={() => selectTabHandler(idx)}
          >
            {el.name}
          </li>
        ))}
      </ul>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          border: 1px solid #d1d1d1;
          border-radius: 15px;
        `}
      >
        {tabList[currentTab].content}
      </div>
    </div>
  );
}

export default TabSection;
