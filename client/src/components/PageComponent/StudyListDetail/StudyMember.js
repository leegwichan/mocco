import { useNavigate } from 'react-router-dom';
import { singleStudyState, userInfoState } from '../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { useState } from 'react';

function StudyMember() {
  const studyInfo = useRecoilValue(singleStudyState);
  const userInfo = useRecoilValue(userInfoState);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section css={container}>
      <div onClick={onChange} role="presentation" css={selected}>
        <div className="profile">
          <img
            css={image}
            src={studyInfo.member.profileImage}
            alt="profile"
            role="presentation"
            onClick={() =>
              userInfo !== null &&
              navigate(`/main/${studyInfo.member.memberId}`)
            }
          />
          <span
            className="main_link"
            role="presentation"
            onClick={() =>
              userInfo !== null &&
              navigate(`/main/${studyInfo.member.memberId}`)
            }
          >
            {studyInfo.member.nickname}
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
          </span>
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
        </div>
      </div>
      <ul css={memberList} className={isOpen ? 'showList' : 'noneList'}>
        {studyInfo.studyMemberList &&
          studyInfo.studyMemberList.map((user, idx) => {
            return (
              <li
                key={idx}
                role="presentation"
                css={member}
                onClick={() =>
                  userInfo !== null && navigate(`/main/${user.memberId}`)
                }
              >
                <img src={user.profileImage} alt="p" css={image} />
                <span>
                  {user.nickname}
                  {user.memberId === studyInfo?.member.memberId && (
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

export default StudyMember;

const container = css`
  width: 230px;
  height: 57px;
  background-color: #ffffff;
  border-radius: 10px;
  z-index: 2;
  border: 2px solid #0b6ff2;

  &:hover {
    cursor: pointer;
  }

  .crown {
    margin-left: 7px;

    @media all and (max-width: 767px) {
      width: 12px;
      height: 12px;
      margin-bottom: -1px;
    }
  }

  @media all and (max-width: 767px) {
    height: 47px;
    margin-top: 10px;
    width: 200px;
  }

  @media all and (max-width: 420px) {
    margin-top: 10px;
    width: 175px;
  }
`;

const selected = css`
  padding: 7px 10px;

  .profile {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .main_link {
    color: black;
    font-size: 18px;
    font-weight: 500;

    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }

  @media all and (max-width: 768px) {
    padding: 2px 8px;

    .main_link {
      font-size: 16px;
      font-weight: 500;
    }
  }

  @media all and (max-width: 420px) {
    padding: 2px 8px;

    .main_link {
      font-size: 0.85rem;
      font-weight: 500;
    }
  }
`;

const image = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;

  @media all and (max-width: 420px) {
    width: 35px;
    height: 35px;
  }
`;

const memberList = css`
  width: 230px;
  background-color: #ffffff;
  margin-top: 10px;
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  list-style: none;
  border: 2px solid #0b6ff2;

  &.showList {
    display: block;
  }

  &.noneList {
    display: none;
  }

  @media all and (max-width: 768px) {
    margin-left: -2px;
    width: 200px;
  }

  @media all and (max-width: 420px) {
    margin-left: -2px;
    width: 175px;
  }
`;

const member = css`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  display: flex;
  justify-content: space-between;
  padding: 7px 20px;
  align-items: center;
  transition: background-color 0.2s ease-in;
  border-radius: 20px;

  &:hover {
    color: #0b6ff2;
  }

  @media all and (max-width: 768px) {
    font-size: 16px;
    font-weight: 500;
    height: 47px;
  }

  @media all and (max-width: 420px) {
    font-size: 0.85rem;
    font-weight: 500;
    height: 43px;
  }
`;
