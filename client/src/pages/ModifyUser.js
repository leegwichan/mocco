import { css } from '@emotion/react';
import ModifyUserInput from '../components/PageComponent/ModifyUser/ModifyUserInput';
import ModifyUserButton from '../components/PageComponent/ModifyUser/ModifyUserButton';

function ModifyUser() {
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
        <h3>회원정보 수정</h3>
      </div>
      <ModifyUserInput labelText="닉네임" type="text" />
      <ModifyUserInput labelText="위치" type="text" />
      <ModifyUserButton buttonText="비밀번호 수정" />
      <ModifyUserInput labelText="이미지 추가 / 변경" type="textarea" />
      <ModifyUserInput labelText="자기소개" type="textarea" />
      <ModifyUserInput labelText="레포지토리" type="textarea" />
      <ModifyUserButton buttonText="프로필 설정 완료" />
      <ModifyUserButton buttonText="회원 탈퇴" />
    </div>
  );
}

export default ModifyUser;
