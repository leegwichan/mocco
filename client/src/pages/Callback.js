import React, { useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import request from '../api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';
import { useLocation } from 'react-router-dom';
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
  // const navigate = useNavigate();
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
        //   navigate(-1); //전 페이지 (마이페이지)로 감
      } catch (err) {
        console.log(err);
        alert(err.message);
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
