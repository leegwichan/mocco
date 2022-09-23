import React, { useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import qs from 'qs';
import request from '../api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Common/Avatar';

const Loading = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 1000px;
`;

function Callback({ location }) {
  const member = useRecoilValue(userInfoState);
  const memberId = member.memberId;
  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => {
      const { query } = qs.parse(location.search, {
        //리디렉션 주소에 코드가 담겨 있음. 쿼리를 객체로 추출해서 patch 요청 바디에 보낸다
        ignoreQueryPrefix: true,
      });
      try {
        const response = await request.patch(
          `/api/members/github-user/${memberId}`,
          query
        );
        console.log(response);
        console.log(response.data.data);
        navigate(-2); //전전페이지 (마이페이지)로 감
      } catch (err) {
        console.log(err);
        alert(err.message); //에러 띄움
      }
    };
    getAuth();
  }, [location]);

  return (
    <div css={Loading}>
      <Avatar />
      <div>깃헙 연동중</div>
    </div>
  );
}

export default Callback;
