import { Link, useNavigate } from 'react-router-dom';
import { singleStudyState } from '../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { useState } from 'react';

function StudyMember() {
  const studyInfo = useRecoilValue(singleStudyState);
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
            onClick={() => navigate(`/main/${studyInfo.member.memberId}`)}
          />
          <span
            className="main_link"
            role="presentation"
            onClick={() => navigate(`/main/${studyInfo.member.memberId}`)}
          >
            {studyInfo.member.nickname}
          </span>
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
        </div>
      </div>
      <ul css={memberList} className={isOpen ? 'showList' : 'noneList'}>
        {studyInfo.studyMemberList &&
          studyInfo.studyMemberList.map((user, idx) => {
            return (
              <Link
                to={`/main/${user.memberId}`}
                css={css`
                  text-decoration: none;
                `}
                key={idx}
              >
                <li role="presentation" css={member}>
                  <img src={user.profileImage} alt="p" css={image} />
                  {user.nickname}
                </li>
              </Link>
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
  /* box-shadow: 0px 0px 7px 3px rgb(0 0 0 / 10%); */
  border: 2px solid #0b6ff2;

  &:hover {
    cursor: pointer;
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
    font-size: 15px;
    font-weight: 500;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }

  @media all and (max-width: 768px) {
    .main_link {
      font-size: 15px;
      font-weight: 500;
    }
  }
`;

const image = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
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
`;

const member = css`
  font-size: 15px;
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
`;
