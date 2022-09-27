import { css } from '@emotion/react';
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { userInfoState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';

function UserSelect({ memberInfo }) {
  const userInfo = useRecoilValue(userInfoState);
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState({});

  const selectHandler = (e) => {
    const { innerText } = e.target;
    const clickedMember = memberInfo.filter(
      (user) => user.nickname === innerText
    );
    setSelect({ ...clickedMember }[0]);
    setIsOpen(false);
  };

  const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section css={container}>
      <label onClick={onChange} role="presentation" css={selected}>
        {select && Object.keys(select).length === 0 ? (
          <>
            <img src={userInfo.memberId} alt="p" />
            sfsdfsf
          </>
        ) : (
          <>
            <img src={select.profileImage} alt="p" />
            <span> {select.nickname}</span>
          </>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#0b6ff2"
          width="30"
          height="30"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </label>
      <ul css={memberList} className={isOpen ? 'showList' : 'noneList'}>
        {memberInfo &&
          memberInfo.map((user, idx) => {
            return (
              <li
                key={idx}
                onClick={selectHandler}
                role="presentation"
                css={member}
              >
                <img src={user.profileImage} alt="p" />
                {user.nickname}
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default UserSelect;

const container = css`
  width: 230px;
  height: 67px;
  background-color: #ffffff;
  border-radius: 20px;
  z-index: 2;
  box-shadow: 2px 9px 2px -2px rgba(0, 0, 0, 0.25);

  &:hover {
    cursor: pointer;
  }
`;

const selected = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding: 20px;
`;

const memberList = css`
  width: 230px;
  background-color: #ffffff;
  margin-top: 10px;
  position: absolute;
  border-radius: 20px;
  border: 2px solid #0b6ff2;
  /* box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25); */

  &.showList {
    display: block;
  }

  &.noneList {
    display: none;
  }
`;

const member = css`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;
