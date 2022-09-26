import React, { useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import request from '../api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../components/Common/Avatar';

const Loading = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 1000px;
`;

function Callback() {
  const member = useRecoilValue(userInfoState);
  const memberId = member.memberId;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let code = location.search.substring(6);
    let body = {
      authorizationCode: code,
    };
    async function getData() {
      try {
        const response = await request.patch(
          `/api/members/github-user/${memberId}`,
          body
        );
        console.log(response);
        console.log(response.data);
        navigate(-1);
      } catch (err) {
        console.log(err);
        if (
          err.response.data.status === 400 &&
          err.response.data.message ===
            '이 계정의 깃허브를 연동한 유저가 이미 존재합니다.'
        ) {
          alert(err.response.data.message);
          navigate(-1);
        }
        if (err.response.data.status === 500) {
          alert(err.response.data.message);
          navigate(-1);
        }
      }
    }
    getData();
  }, [location]);

  return (
    <div css={Loading}>
      <Avatar />
      <div>깃헙 연동중</div>
    </div>
  );
}

export default Callback;
