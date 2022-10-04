import { Link } from 'react-router-dom';
import { singleStudyState } from '../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { useState } from 'react';

function StudyMember() {
  const studyInfo = useRecoilValue(singleStudyState);
  const [isOpen, setIsOpen] = useState(false);

  const onChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section css={container}>
      <div onClick={onChange} role="presentation" css={selected}>
        <Link
          to={`/main/${studyInfo.member.nickname}`}
          css={css`
            text-decoration: none;
          `}
        >
          <div css={profile}>
            <img
              css={image}
              src={studyInfo.member.profileImage}
              alt="profile"
            />
            {/* <span className="main_link">{studyInfo.member.nickname}</span> */}
            <span className="main_link">가나다라마바사아</span>
          </div>
        </Link>
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
      <ul css={memberList} className={isOpen ? 'showList' : 'noneList'}>
        {studyInfo.studyMemberList &&
          studyInfo.studyMemberList.map((user, idx) => {
            return (
              <li key={idx} role="presentation" css={member}>
                <img src={user.profileImage} alt="p" css={image} />
                {user.nickname}
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
  border-radius: 20px;
  z-index: 2;
  box-shadow: 0px 0px 7px 3px rgb(0 0 0 / 10%);

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
  padding: 10px;
`;

const memberList = css`
  width: 230px;
  background-color: #ffffff;
  margin-top: 10px;
  position: absolute;
  border-radius: 20px;
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

const profile = css`
  display: flex;
  align-items: center;

  .main_link {
    color: black;
    font-size: 20px;
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

const member = css`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  transition: background-color 0.2s ease-in;
  border-radius: 20px;

  &:hover {
    color: #0b6ff2;
  }
`;
