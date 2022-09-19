import { css } from '@emotion/react';
import request from '../api';

function LogIn() {
  const onSubmit = (event) => {
    event.preventDefault();

    request({
      method: 'post',
      url: '/api/register/login',
      data: {
        email: event.target.email.value,
        password: event.target.password.value,
      },
    })
      .then(console.log)
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
            <h3>Mocco 계정에 로그인하세요</h3>
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
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
