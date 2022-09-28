import { css } from '@emotion/react';

const Grass = css`
  height: 200px;
  display: flex;
  justify-content: space-around;
`;

const NoGrass = css`
  height: 252px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #2d2d2d;
`;

function GitHubGrass({ githubId }) {
  return (
    <div css={Grass}>
      {githubId ? (
        <img
          src={'https://ghchart.rshah.org/0B6FF2/' + githubId}
          alt="깃허브 활동 기록"
        />
      ) : (
        <div css={NoGrass}>Git Hub를 연동하지 않은 유저입니다</div>
      )}
    </div>
  );
}

export default GitHubGrass;
