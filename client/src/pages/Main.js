import React, { useEffect, useState } from 'react'; // eslint-disable-line no-unused-vars
import request from '../api';
// import TotalContainer from '../components/PageComponent/Main/TotalContainer';
import { css } from '@emotion/react';

const totalContainer = css`
  max-width: 1200px;
  margin: auto;
  margin-top: 50px;
  border: solid 1px black;
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
      <h1>{userProfile.nickname}의 페이지</h1>
      <div>안녕</div>
    </section>
  );
}

export default Main;
