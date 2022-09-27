import { css } from '@emotion/react';
import ModifyUserInput from '../components/PageComponent/ModifyUser/ModifyUserInput';
import ModifyUserButton from '../components/PageComponent/ModifyUser/ModifyUserButton';
import { useCallback, useRef, useState } from 'react';
import ChangePasswordModal from '../components/PageComponent/ModifyUser/ChangePasswordModal';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../atom/atom';
import request from '../api';
import WithdrawalModal from '../components/PageComponent/ModifyUser/WithdrawalModal';

function ModifyUser() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  console.log('u :', userInfo);
  const [changPasswordmodalOn, setChangePasswordModalOn] = useState(false);
  const [withdrawalModalOn, setWithdrawalModalOn] = useState(false);

  const openChangePasswordModal = () => setChangePasswordModalOn(true);
  const closeChangePasswordModal = () => setChangePasswordModalOn(false);

  const openWithdrawalModal = () => setWithdrawalModalOn(true);
  const closeWithdrawalModal = () => setWithdrawalModalOn(false);

  const [image, setImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const inputRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('e :', console.log(event.target));
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
        profileImage: event.target.imageUpload,
      },
    }).then((res) => setUserInfo(res.data.data));
    console.log('img :', event.target.imageUpload);
  };

  // 이미지 업로드 기능
  const onUploadImage = useCallback((e) => {
    if (!e.target.files) {
      return;
    }
    console.log('a');
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log('e :', e.target.files[0].size);

    request({
      method: 'post',
      url: '/api/members/image',
      params: { 'file-size': e.target.files[0].size },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    }).then((res) => {
      setImage(image);
      setPreviewUrl(res.data.data);
      console.log('imaPreview :', res.data.data);
    });
  });

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

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
        onClick={openChangePasswordModal}
      />

      {/* 이미지 업로드 */}
      <ModifyUserInput
        labelText="이미지 추가 / 변경"
        type="file"
        accept="image/*"
        onChange={onUploadImage}
        name="imageUpload"
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <div>
        {previewUrl && (
          <img
            css={css`
              border-radius: 50%;
              height: 350px;
              filter: drop-shadow(8px 10px 5px #999999);
            `}
            src={previewUrl}
            alt="previewImage"
          />
        )}
      </div>
      <ModifyUserButton
        buttonText="이미지 업로드 하기"
        type="button"
        onClick={onUploadImageButtonClick}
      />
      {/* 자기소개 */}
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
      <ModifyUserButton
        buttonText="회원 탈퇴"
        type="button"
        onClick={openWithdrawalModal}
      />
      {changPasswordmodalOn && (
        <ChangePasswordModal onClose={closeChangePasswordModal} />
      )}
      {withdrawalModalOn && <WithdrawalModal onClose={closeWithdrawalModal} />}
    </form>
  );
}

export default ModifyUser;
