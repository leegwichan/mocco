import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import request from '../api';

function SignUp() {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    request({
      method: 'post',
      url: '/api/register/signup',
      data: {
        email: event.target.email.value,
        password: event.target.password.value,
        nickname: event.target.nickname.value,
      },
    })
      .then(() => navigate('/login'))
      .catch(console.error);
  };

  return (
    <div>
      <div>
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
            <h3>회원가입</h3>
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
              htmlFor="nickname"
              css={css`
                font-size: 18px;
              `}
            >
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              css={css`
                width: 100%;
                height: 40px;
                background-color: #ffffff;
                border-radius: 5px;
                border: 1px solid #d1d1d1;
                margin-top: 12px;
                margin-bottom: 12px;
              `}
            ></input>

            <div
              css={css`
                margin-bottom: 12px;
              `}
            >
              <p
                css={css`
                  font-size: 12px;
                  color: red;
                `}
              >
                이미 존재하는 닉네임입니다.
              </p>
            </div>

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
            >
              <p
                css={css`
                  font-size: 12px;
                  color: red;
                `}
              >
                이미 존재하는 이메일입니다.
              </p>
            </div>

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

            <label
              htmlFor="password"
              css={css`
                font-size: 18px;
                margin-bottom: 12px;
              `}
            >
              비밀번호 확인
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
                margin-bottom: 12px;
              `}
            >
              <p
                css={css`
                  font-size: 12px;
                  color: red;
                `}
              >
                비밀번호가 일치하지 않습니다.
              </p>
            </div>

            <div
              css={css`
                display: flex;
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                style={{ fill: '#D1D1D1' }}
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
              </svg>
              <p
                css={css`
                  font-size: 12px;
                  margin-left: 10px;
                  display: flex;
                  align-items: center;
                `}
              >
                (필수)
                <span
                  css={css`
                    color: #0b6ff2;
                    text-decoration: underline;
                  `}
                >
                  서비스 이용약관
                </span>
                과
                <span
                  css={css`
                    color: #0b6ff2;
                    text-decoration: underline;
                  `}
                >
                  개인정보 취급방침
                </span>
                에 동의합니다.
              </p>
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
                font-size: 18px;
                font-weight: normal;
              `}
            >
              회원가입
            </button>

            <div
              css={css`
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                border-top: 1px solid #d1d1d1;
                padding-top: 18px;
              `}
            >
              <p>이미 계정이 있으신가요?</p>
              <p
                css={css`
                  color: #0b6ff2;
                `}
              >
                로그인
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
