import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import request from '../api/index';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../atom/atom';
import ForgotPasswordModal from '../components/PageComponent/Login/ForgotPasswordModal';
import setAuthorizationToken from '../utils/setAuthorizationToken';

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [modalOn, setModalOn] = useState(false);
  const setUserInfoState = useSetRecoilState(userInfoState);
  const onSubmit = (event) => {
    event.preventDefault();

    // setTimeout(() => {
    //   localStorage.setItem('accessToken', 'accessToken-test');
    //   localStorage.setItem('refreshToken', 'refreshToken-test');

    //   setUserInfoState({ memberId: '29', username: 'seraheo' });
    //   navigate(location.state ? location.state.from : `/main/29`);
    // }, 1000);

    request({
      method: 'post',
      url: '/api/register/login',
      data: {
        email: event.target.email.value,
        password: event.target.password.value,
      },
    })
      .then((res) => {
        localStorage.setItem('accessToken', res.headers.accesstoken);
        localStorage.setItem('refreshToken', res.headers.refreshtoken);
        setAuthorizationToken(res.headers.accesstoken);
        setUserInfoState(res.data.data);
        console.log(res.data.data);
        return res;
      })
      .then((res) => {
        navigate(
          location.state
            ? location.state.from
            : `/main/${res.data.data.memberId}`
        );
      })
      .catch((err) => console.log(err));
  };

  const openForgotPasswordModal = () => setModalOn(true);

  const closeForgotPasswordModal = () => setModalOn(false);

  return (
    <div
      css={css`
        max-width: 350px;
        margin: 0 auto;
        padding: 100px 0px;
      `}
    >
      <div
        css={css`
          margin-bottom: 18px;
          border-bottom: 1px solid #d1d1d1;
          padding-bottom: 18px;
          font-size: 32px;
        `}
      >
        <h3>로그인</h3>
      </div>

      <form
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
        onSubmit={onSubmit}
      >
        <label
          htmlFor="email"
          css={css`
            font-size: 18px;
          `}
        >
          이메일
        </label>
        <input
          type="email"
          name="email"
          id="email"
          css={css`
            width: 100%;
            height: 40px;
            background-color: #ffffff;
            border-radius: 5px;
            border: 1px solid #d1d1d1;
            margin-top: 12px;
          `}
        ></input>
        <div
          css={css`
            margin-top: 12px;
            margin-bottom: 12px;
          `}
        ></div>

        <label
          htmlFor="password"
          css={css`
            font-size: 18px;
            margin-bottom: 12px;
          `}
        >
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          id="password"
          css={css`
            width: 100%;
            height: 40px;
            background-color: #ffffff;
            border-radius: 5px;
            border: 1px solid #d1d1d1;
            margin-bottom: 12px;
          `}
        ></input>

        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          <button
            css={css`
              font-size: 12px;
              color: #0b6ff2;
              text-align: right;
              border: 0;
              background-color: white;
            `}
            onClick={openForgotPasswordModal}
            type="button"
          >
            비밀번호 찾기
          </button>
        </div>

        <button
          type="submit"
          css={css`
            width: 100%;
            height: 40px;
            color: #ffffff;
            background-color: #0b6ff2;
            border-radius: 5px;
            border-width: 0px;
            margin-top: 12px;
            margin-bottom: 30px;
          `}
        >
          로그인
        </button>
        <p
          css={css`
            text-align: center;
            font-size: 14px;
          `}
        >
          소셜로 로그인 하기
        </p>
        <div
          css={css`
            display: flex;
            justify-content: center;
            margin-top: 18px;
            margin-bottom: 30px;
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            border-top: 1px solid #d1d1d1;
            padding-top: 18px;
          `}
        >
          <p>아직 회원이 아니신가요?</p>
          <p
            css={css`
              color: #0b6ff2;
            `}
          >
            회원가입
          </p>
        </div>
      </form>

      {modalOn && <ForgotPasswordModal onClose={closeForgotPasswordModal} />}
    </div>
  );
}

export default LogIn;
