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
import { useParams } from 'react-router-dom';
import Footer from '../components/Common/Footer';

const Header = css`
  width: 100vw;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const totalContainer = css`
  max-width: 1260px;
<<<<<<< HEAD
  padding: 0px 2rem;
=======
>>>>>>> 2ee9cd40995be1506f2e5629aa562dbee7936d64
  height: 2000px;
  margin: auto;
  padding: 0px 1rem;
  margin-top: 50px;
  margin-bottom: 100px;
  .githubmargin {
    margin-bottom: 10%;
  }
  @media all and (max-width: 1023px) {
<<<<<<< HEAD
=======
    /* padding: 0px 24px; */
>>>>>>> 2ee9cd40995be1506f2e5629aa562dbee7936d64
    margin-top: 34px;
    margin-bottom: 10%;
  }
`;

const title = css`
  font-size: 30px;
  font-weight: 600;
  @media all and (max-width: 767px) {
    /* font-size: 30px; */
  }
`;

const infoSection = css`
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
  margin-bottom: 10%;
  height: auto;

  @media all and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;

const sectionItem = css`
  height: auto;
  margin-bottom: 10%;
`;

const sectionTitle = css`
  font-size: 24px;
  margin-bottom: 15px;
`;

function Main() {
  const [isConnectedGit, setIsConnectedGit] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [owner, setOwner] = useRecoilState(mypageOwnerAtom);
  const loginUser = useRecoilValue(userInfoState);
  const { id } = useParams();

  useEffect(() => {
    getUserInfo(id);
  }, [id]);

  const getUserInfo = (id) => {
    return request
      .get(`/api/members/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setOwner(res.data.data);
        return res;
      })
      .then((res) => {
        if (res.data.data.githubNickname !== null) {
          setIsConnectedGit(true);
        }
        return res;
      })
      .then((res) => {
        if (res.data.data.memberId === loginUser.memberId) {
          setIsOwner(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <header css={Header}></header>
      <section css={totalContainer}>
        <h1 css={title}>{owner.nickname}의 페이지</h1>
        <section css={infoSection}>
          <MyProfile
            isConnectedGit={isConnectedGit}
            isOwner={isOwner}
            githubId={owner.githubNickname}
          />
          <MyIntro introduction={owner.introduction} />
          <GitHubRepo githubRepositoryList={owner.githubRepositoryList} />
        </section>
        <section className="githubmargin">
          <div css={sectionTitle}>GitHub 활동</div>
          <GitHubGrass githubId={owner.githubNickname} />
        </section>
        <section css={sectionItem}>
          <div css={sectionTitle}>진행중인 스터디</div>
          <ProgressList />
        </section>
        <section css={sectionItem}>
          <div css={sectionTitle}>완료된 스터디</div>
          <DoneList />
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Main;
