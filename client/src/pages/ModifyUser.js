import { css } from '@emotion/react';
import ModifyUserInput from '../components/PageComponent/ModifyUser/ModifyUserInput';
import ModifyUserButton from '../components/PageComponent/ModifyUser/ModifyUserButton';
import { useState } from 'react';
import ChangePasswordModal from '../components/PageComponent/ModifyUser/ChangePasswordModal';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../atom/atom';
import request from '../api';

function ModifyUser() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  console.log('u :', userInfo);
  const [modalOn, setModalOn] = useState(false);

  const openModal = () => setModalOn(true);

  const closeModal = () => setModalOn(false);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('e');
    request({
      method: 'patch',
      url: `/api/members/${userInfo.memberId}`,
      data: {
        nickname: event.target.nickname.value,
        introduction: event.target.introduction.value,
        location: event.target.location.value,
        githubRepository1: event.target.githubRepository1.value || null,
        githubRepository2: event.target.githubRepository2.value || null,
        githubRepository3: event.target.githubRepository3.value || null,
        profileImage: null,
      },
    }).then((res) => setUserInfo(res.data.data));
  };

  return (
    <form
      css={css`
        max-width: 350px;
        margin: 0 auto;
        padding: 100px 0px;
      `}
      onSubmit={onSubmit}
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
        name="nickname"
      />
      <ModifyUserInput
        labelText="위치"
        type="text"
        defaultValue={userInfo.location}
        name="location"
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
        name="introduction"
      />
      <ModifyUserInput
        labelText="Git Hub Repository 1"
        type="url"
        defaultValue={userInfo.githubRepositoryList[0]}
        name="githubRepository1"
      />
      <ModifyUserInput
        labelText="Git Hub Repository 2"
        type="url"
        defaultValue={userInfo.githubRepositoryList[1]}
        name="githubRepository2"
      />
      <ModifyUserInput
        labelText="Git Hub Repository 3"
        type="url"
        defaultValue={userInfo.githubRepositoryList[2]}
        name="githubRepository3"
      />
      <ModifyUserButton buttonText="프로필 설정 완료" type="submit" />
      <ModifyUserButton buttonText="회원 탈퇴" type="button" />
      {modalOn && <ChangePasswordModal onClick={closeModal} />}
    </form>
  );
}

export default ModifyUser;
