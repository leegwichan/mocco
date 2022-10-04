import { css } from '@emotion/react';
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars

function UserSelect({ memberInfo, select, setSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = () => {
    setIsOpen(!isOpen);
  };

  const selectHandler = (e) => {
    const { innerText } = e.target;
    const clickedMember = memberInfo.filter(
      (user) => user.nickname === innerText
    );
    // console.log('내가 클릭드야', clickedMember);
    setSelect({ ...clickedMember }[0]);
    setIsOpen(false);
  };

  return (
    <section css={container}>
      <label onClick={onChange} role="presentation" css={selected}>
        {select && (
          <>
            <img src={select.profileImage} alt="profile" css={image} />
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
                <img src={user.profileImage} alt="p" css={image} />
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
  box-shadow: 0px 0px 15px 3px rgb(0 0 0 / 10%);
  border: 2px solid #0b6ff2;

  &:hover {
    cursor: pointer;
  }

  @media all and (max-width: 767px) {
    height: 45px;
    border-radius: 10px;
  }
`;

const selected = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  padding: 10px;
  width: 215px;
  word-break: break-all;

  @media all and (max-width: 767px) {
    font-size: 15px;
    padding: 7px;
    width: 150px;
    svg {
      width: 16px;
    }
  }
`;

const memberList = css`
  width: 215px;
  background-color: #ffffff;
  margin-top: 16rem;
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  list-style: none;
  border: 2px solid #0b6ff2;
  word-break: break-all;

  &.showList {
    display: block;
  }

  &.noneList {
    display: none;
  }

  @media all and (max-width: 767px) {
    margin-top: 14rem;
    width: 150px;
    border-radius: 15px;
  }
`;

const image = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @media all and (max-width: 767px) {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
`;

const member = css`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  transition: background-color 0.2s ease-in;
  border-radius: 20px;
  height: 80px;

  &:hover {
    color: #0b6ff2;
  }

  @media all and (max-width: 767px) {
    padding: 12px;
    font-size: 15px;
  }
`;
