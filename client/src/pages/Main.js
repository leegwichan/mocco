import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import request from '../api';
import { css } from '@emotion/react';
import MyProfile from '../components/PageComponent/Main/MyProfile';
import MyIntro from '../components/PageComponent/Main/MyIntro';
import GitHubRepo from '../components/PageComponent/Main/GitHubRepo';
import ProgressList from '../components/PageComponent/Main/MyStudyList/ProgressList';
import DoneList from '../components/PageComponent/Main/MyStudyList/DoneList';
import GitHubGrass from '../components/PageComponent/Main/GitHubGrass';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoState, mypageOwnerAtom } from '../atom/atom';
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
  height: 300px;
  margin-bottom: 10%; // 원래 3%. 캐러셀 구현하려고 늘려놓음. 버튼 양옆으로 배치한 후 다시 돌려놓기
`;

const sectionTitle = css`
  font-size: 24px;
  margin-bottom: 15px;
`;

function Main() {
  const [isConnectedGit, setIsConnectedGit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [ownerI, setOwnerI] = useRecoilState(mypageOwnerAtom);
  const loginUser = useRecoilValue(userInfoState);

  useEffect(() => {
    getUserInfo();
    // 깃헙 연동 여부
    if (ownerI.githubId) {
      setIsConnectedGit(true);
    }
    //마이페이지 owner 여부
    if (ownerI.memberId === loginUser.memberId) {
      setIsOwner(true);
    }
  }, []);

  const getUserInfo = () => {
    return request
      .get('/api/members/3')
      .then((res) => {
        setOwnerI(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section css={totalContainer}>
      <h1 css={title}>{ownerI.nickname}의 페이지</h1>
      <section css={infoSection}>
        <MyProfile
          isConnectedGit={isConnectedGit}
          isOwner={isOwner}
          githubId={ownerI.githubId}
        />
        <MyIntro introduction={ownerI.introduction} />
        <GitHubRepo githubRepositoryList={ownerI.githubRepositoryList} />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>GitHub 활동</div>
        <GitHubGrass githubId={ownerI.githubId} />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>진행중인 스터디</div>
        <ProgressList />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>완료된 스터디</div>
        <DoneList studyList={ownerI.doneStudy} />
      </section>
    </section>
  );
}

export default Main;
