import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import request from '../api';
// import TotalContainer from '../components/PageComponent/Main/TotalContainer';
import { css } from '@emotion/react';
import MyProfile from '../components/PageComponent/Main/MyProfile';
import MyIntro from '../components/PageComponent/Main/MyIntro';
import GitHubRepo from '../components/PageComponent/Main/GitHubRepo';
const totalContainer = css`
  max-width: 1200px;
  margin: auto;
  margin-top: 50px;
`;
const title = css`
  font-size: 35px;
  font-weight: 600;
`;
const infoSection = css`
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
  margin-bottom: 3%;
  height: 235px;
`;

const sectionItem = css`
  max-width: 1200px;
  height: 300px;
  margin-bottom: 3%;
`;
const sectionTitle = css`
  font-size: 24px;
  margin-bottom: 15px;
`;
const sectionContents = css`
  height: 252px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
`;
function Main() {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = () => {
    return request
      .get('/api/members/1')
      .then((res) => {
        setUserProfile(res.data.data);
        console.log(userProfile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section css={totalContainer}>
      <h1 css={title}>{userProfile.nickname}의 페이지</h1>
      <section css={infoSection}>
        <MyProfile
          nickname={userProfile.nickname}
          img={userProfile.profileImage}
          githubId={userProfile.githubId}
          location={userProfile.location}
        />
        <MyIntro introduction={userProfile.introduction} />
        <GitHubRepo githubRepositoryList={userProfile.githubRepositoryList} />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>GitHub 활동</div>
        <div css={sectionContents}></div>
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>진행중인 스터디</div>
        <div css={sectionContents}></div>
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>완료된 스터디</div>
        <div css={sectionContents}></div>
      </section>
    </section>
  );
}

export default Main;
