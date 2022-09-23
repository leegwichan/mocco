import { css } from '@emotion/react';
import ModifyUserInput from '../components/PageComponent/ModifyUser/ModifyUserInput';
import ModifyUserButton from '../components/PageComponent/ModifyUser/ModifyUserButton';
import { useState } from 'react';
import ChangePasswordModal from '../components/PageComponent/ModifyUser/ChangePasswordModal';

function ModifyUser() {
  const [modalOn, setModalOn] = useState(false);

  const openModal = () => setModalOn(true);

  const closeModal = () => setModalOn(false);

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
      <ModifyUserButton
        buttonText="비밀번호 변경하기"
        type="button"
        onClick={openModal}
      />
      <ModifyUserInput labelText="이미지 추가 / 변경" type="textarea" />
      <ModifyUserInput labelText="자기소개" type="textarea" />
      <ModifyUserInput labelText="Git Hub Repository 1" type="url" />
      <ModifyUserInput labelText="Git Hub Repository 2" type="url" />
      <ModifyUserInput labelText="Git Hub Repository 3" type="url" />
      <ModifyUserButton buttonText="프로필 설정 완료" />
      <ModifyUserButton buttonText="회원 탈퇴" />
      {modalOn && <ChangePasswordModal onClose={closeModal} />}
    </div>
  );
}

export default ModifyUser;
