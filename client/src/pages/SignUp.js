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
          `}
        >
          <div
            css={css`
              margin-bottom: 6px;
            `}
          >
            <h3>회원가입 하세요</h3>
          </div>

          <form
            css={css`
              display: flex;
              flex-direction: column;
              gap: 4px;
            `}
            onSubmit={onSubmit}
          >
            <input type="email" name="email" placeholder="e-mail"></input>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
            ></input>
            <input type="text" name="nickname" placeholder="nickname"></input>
            <button type="submit">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
