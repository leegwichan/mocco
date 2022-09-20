import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import request from '../api';
import { css } from '@emotion/react';
import MyProfile from '../components/PageComponent/Main/MyProfile';
import MyIntro from '../components/PageComponent/Main/MyIntro';
import GitHubRepo from '../components/PageComponent/Main/GitHubRepo';
import ProgressList from '../components/PageComponent/Main/ProgressList';
import DoneList from '../components/PageComponent/Main/DoneList';

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
  margin-bottom: 5%;
  height: 250px;
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
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
function Main() {
  const [userProfile, setUserProfile] = useState({});
  const [isConnectedGit, setIsConnectedGit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  let loginMemberId = 1; //리코일 세팅 전, 테스트를 위해 임의로 (로그인한)memberId 설정

  useEffect(() => {
    getUserInfo();
    // 깃헙 연동 여부
    if (userProfile.githubId) {
      setIsConnectedGit(true);
    }
    //마이페이지 owner 여부
    if (userProfile.memberId === loginMemberId) {
      setIsOwner(true);
    }
    console.log(userProfile.progressStudy);
  }, []);

  const getUserInfo = () => {
    return request
      .get('/api/members/3')
      .then((res) => {
        setUserProfile(res.data.data);
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
          isConnectedGit={isConnectedGit}
          isOwner={isOwner}
          nickname={userProfile.nickname}
          location={userProfile.location}
          profileImage={userProfile.profileImage}
          githubId={userProfile.githubId}
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
        <ProgressList studyList={userProfile.progressStudy} />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>완료된 스터디</div>
        <DoneList studyList={userProfile.doneStudy} />
      </section>
    </section>
  );
}

export default Main;
