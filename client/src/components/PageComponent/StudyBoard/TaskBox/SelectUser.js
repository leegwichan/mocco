import { css } from '@emotion/react';
import React, { useState } from 'react'; // eslint-disable-line no-unused-vars

function UserSelect({ memberInfo, select, setSelect, leaderInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = () => {
    setIsOpen(!isOpen);
  };

  const selectHandler = (e) => {
    const { innerText } = e.target;
    const clickedMember = memberInfo.filter(
      (user) => user.nickname === innerText
    );
    setSelect({ ...clickedMember }[0]);
    setIsOpen(false);
  };

  console.log(leaderInfo);

  return (
    <section css={container}>
      <label onClick={onChange} role="presentation" css={selected}>
        {select && (
          <>
            <img src={select.profileImage} alt="profile" css={image} />
            <span>
              {select.nickname}
              {select.memberId === leaderInfo?.memberId && (
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
            </span>
          </>
        )}
        {isOpen ? (
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
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
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
        )}
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
                <span>
                  {user.nickname}
                  {user.memberId === leaderInfo.memberId && (
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
                </span>
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
  box-shadow: 0px 0px 15px 2px rgb(0 0 0 / 10%);
  border: 2px solid #0b6ff2;
  &:hover {
    cursor: pointer;
  }

  .crown {
    margin-left: 5px;

    @media all and (max-width: 767px) {
      width: 12px;
      height: 12px;
      margin-bottom: -1px;
    }
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
  font-size: 17px;
  font-weight: 500;
  padding: 10px 6px;
  width: 215px;
  word-break: break-all;

  @media all and (max-width: 767px) {
    font-size: 1px;
    padding: 7px;
    width: 25vw;
    min-width: 120px;
    svg {
      width: 16px;
    }
  }
`;

const memberList = css`
  width: 215px;
  background-color: #ffffff;
  margin-top: 15px;
  position: absolute;
  z-index: 1;
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
    margin-top: 8px;
    border-radius: 15px;
    width: 25.3vw;
    min-width: 120px;
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
    /* padding: 12px;
    font-size: 15px; */
    height: 55px;
    font-size: 1px;
    padding: 7px;
  }
`;
