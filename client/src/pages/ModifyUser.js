import { css } from '@emotion/react';
import ModifyUserInput from '../components/PageComponent/ModifyUser/ModifyUserInput';
import ModifyUserButton from '../components/PageComponent/ModifyUser/ModifyUserButton';
import { useState } from 'react';
import ChangePasswordModal from '../components/PageComponent/ModifyUser/ChangePasswordModal';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../atom/atom';

function ModifyUser() {
  const userInfo = useRecoilValue(userInfoState);

  // const [modifyUserInfo, setModifyUserInfo] = useState({
  //   nickname: userInfo.nickname,
  //   location: userInfo.location,
  //   introduction: userInfo.introduction,
  //   githubRepositoryList1: userInfo.githubRepositoryList[0],
  //   githubRepositoryList2: userInfo.githubRepositoryList[1],
  //   githubRepositoryList3: userInfo.githubRepositoryList[2],
  // });

  console.log('userInfo :', userInfo);
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
      <ModifyUserInput
        labelText="닉네임"
        type="text"
        defaultValue={userInfo.nickname}
      />
      <ModifyUserInput
        labelText="위치"
        type="text"
        defaultValue={userInfo.location}
      />
      <ModifyUserButton
        buttonText="비밀번호 변경하기"
        type="button"
        onClick={openModal}
      />
      {/* TODO: 변경 필요 */}
      <ModifyUserInput labelText="이미지 추가 / 변경" type="textarea" />
      <ModifyUserInput
        labelText="자기소개"
        type="textarea"
        defaultValue={userInfo.location}
      />
      <ModifyUserInput
        labelText="Git Hub Repository 1"
        type="url"
        defaultValue={userInfo.githubRepositoryList[0]}
      />
      <ModifyUserInput
        labelText="Git Hub Repository 2"
        type="url"
        defaultValue={userInfo.githubRepositoryList[1]}
      />
      <ModifyUserInput
        labelText="Git Hub Repository 3"
        type="url"
        defaultValue={userInfo.githubRepositoryList[2]}
      />
      <ModifyUserButton buttonText="프로필 설정 완료" />
      <ModifyUserButton buttonText="회원 탈퇴" />
      {modalOn && <ChangePasswordModal onClick={closeModal} />}
    </div>
  );
}

export default ModifyUser;
