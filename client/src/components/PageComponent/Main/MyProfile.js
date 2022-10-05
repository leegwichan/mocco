import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import GitHubBtnBlue from './GitHubBtn/GitHubBtnBlue';
import GitHubBtnMyGray from './GitHubBtn/GitHubBtnMyGray';
import GitHubBtnGray from './GitHubBtn/GitHubBtnGray';
import { useRecoilValue } from 'recoil';
import { mypageOwnerAtom } from '../../../atom/atom';
import ProfileStar from './ProfileStar';

const container = css`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media all and (max-width: 767px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }
`;

const roundImg = css`
  height: 115px;
  max-width: 115px;
  width: 82%;
  height: 100%;
  border-radius: 50%;
  @media all and (max-width: 767px) {
    height: 100px;
  }
`;

const name = css`
  font-size: 20px;
  font-weight: 500;
  margin: 2px;
  @media all and (max-width: 767px) {
    font-size: 25px;
    margin: 8px;
  }
`;

const nameLocation = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
  .locationIcon {
    color: #4391f9;
    width: 17px;
  }
  .smallText {
    font-size: 8px;
  }
  .location {
    display: flex;
    justify-content: center;
    margin-bottom: -2px;
    width: 100%;
  }
  @media all and (max-width: 767px) {
    .location {
      display: flex;
      justify-content: center;
      margin-bottom: -5px;
    }
    .smallText {
      font-size: 12px;
    }
    .locationIcon {
    }
  }
`;

const Evaluation = css`
  display: flex;
  align-items: center;
  font-size: smaller;
  @media all and (max-width: 767px) {
    /* height: 80%; */
  }
`;

const withoutImg = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 50%;
  width: 100%;
  justify-content: space-between;

  @media all and (max-width: 767px) {
    width: 65%;
    height: 150px;
    justify-content: space-between;
  }
`;

function MyProfile({ githubId, isConnectedGit, isOwner }) {
  const owner = useRecoilValue(mypageOwnerAtom);

  return (
    <section css={container}>
      <img
        css={roundImg}
        className="img"
        src={owner.profileImage}
        alt={'프로필 이미지'}
      />
      <section css={withoutImg}>
        <section css={nameLocation}>
          {owner.location && (
            <div className="location">
              <svg
                className="locationIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="smallText">{owner.location}</div>
            </div>
          )}

          <div css={name}>{owner.nickname}</div>
          {owner.evaluation > 0 ? (
            <div css={Evaluation}>
              <ProfileStar evaluation={owner.evaluation.toFixed(1)} />
              평점 {owner.evaluation.toFixed(1)}
            </div>
          ) : null}
        </section>
        {isConnectedGit ? (
          <GitHubBtnBlue githubId={githubId} />
        ) : isOwner ? (
          <GitHubBtnMyGray memberId={owner.memberId} />
        ) : (
          <GitHubBtnGray />
        )}
      </section>
    </section>
  );
}
export default MyProfile;
