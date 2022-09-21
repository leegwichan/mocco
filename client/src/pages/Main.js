import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import request from '../api';
import { css } from '@emotion/react';
import MyProfile from '../components/PageComponent/Main/MyProfile';
import MyIntro from '../components/PageComponent/Main/MyIntro';
import GitHubRepo from '../components/PageComponent/Main/GitHubRepo';
import ProgressList from '../components/PageComponent/Main/MyStudyList/ProgressList';
import DoneList from '../components/PageComponent/Main/MyStudyList/DoneList';
import EvalueModal from '../components/PageComponent/Main/Evaluation/EvalueModal';
import GitHubGrass from '../components/PageComponent/Main/GitHubGrass';

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

function Main() {
  const [ownerInfo, setOwnerInfo] = useState({});
  const [isConnectedGit, setIsConnectedGit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  let loginMemberId = 1; //리코일 세팅 전, 테스트를 위해 임의로 (로그인한)memberId 설정

  useEffect(() => {
    getUserInfo();
    // 깃헙 연동 여부
    if (ownerInfo.githubId) {
      setIsConnectedGit(true);
      console.log(ownerInfo);
    }
    //마이페이지 owner 여부
    if (ownerInfo.memberId === loginMemberId) {
      setIsOwner(true);
    }
    console.log(ownerInfo);
  }, []);

  const getUserInfo = () => {
    return request
      .get('/api/members/3')
      .then((res) => {
        setOwnerInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section css={totalContainer}>
      <h1 css={title}>{ownerInfo.nickname}의 페이지</h1>
      <section css={infoSection}>
        <MyProfile
          isConnectedGit={isConnectedGit}
          isOwner={isOwner}
          nickname={ownerInfo.nickname}
          location={ownerInfo.location}
          profileImage={ownerInfo.profileImage}
          githubId={ownerInfo.githubId}
          evaluation={ownerInfo.evaluation}
        />
        <MyIntro introduction={ownerInfo.introduction} />
        <GitHubRepo githubRepositoryList={ownerInfo.githubRepositoryList} />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>GitHub 활동</div>
        <GitHubGrass githubId={ownerInfo.githubId} />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>진행중인 스터디</div>
        <ProgressList studyList={ownerInfo.progressStudy} />
      </section>
      <section css={sectionItem}>
        <div css={sectionTitle}>완료된 스터디</div>
        <DoneList studyList={ownerInfo.doneStudy} />
      </section>
      <EvalueModal
        text={'스터디 후기를 작성해주세요'}
        firstBtnType={'small_blue'}
        secondBtnType={'small_grey'}
        firstBtnText={'제출'}
        secondBtnText={'닫기'}
      />
    </section>
  );
}

export default Main;
