import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import GitHubBtnBlue from './GitHubBtn/GitHubBtnBlue';
import GitHubBtnMyGray from './GitHubBtn/GitHubBtnMyGray';
import GitHubBtnGray from './GitHubBtn/GitHubBtnGray';

const container = css`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const roundImg = css`
  border-radius: 100%;
  max-width: 80%;
`;
const name = css`
  font-size: 20px;
`;
const locationIcon = css`
  color: #4391f9;
  font-size: 20px;
`;
function MyProfile({
  img,
  nickname,
  evaluation,
  githubId,
  isConnectedGit,
  isOwner,
  profileImage,
  location,
}) {
  const navigate = useNavigate();

  return (
    <section css={container}>
      <img
        src={
          img === null
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU'
            : profileImage
        }
        alt={'프로필 이미지'}
        css={roundImg}
      />
      <section>
        <div css={name}>닉네임{nickname}</div>
        <div>
          <svg
            css={locationIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <div>{location}</div>
        </div>
      </section>

      <div>평점{evaluation}</div>
      {isConnectedGit ? (
        <GitHubBtnBlue githubId={githubId} />
      ) : isOwner ? (
        <GitHubBtnMyGray onClick={() => navigate('/login')} /> //클릭 시 로그인 페이지로
      ) : (
        <GitHubBtnGray />
      )}
    </section>
  );
}
// 연동 안한 경우
// 1. 로그인한 유저 !== 마이페이지 유저인 경우 GitHubGray
// 2. 로그인한 유저 === 마이페이지 유저인 경우 GitHubMyGray
//깃헙 연동(마이페이지 주인 정보에 깃헙 아이디가 있음)한 경우 => 마지막으로 파란색
export default MyProfile;
