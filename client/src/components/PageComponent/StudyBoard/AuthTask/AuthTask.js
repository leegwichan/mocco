import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import request from '../../../../api';
import porfile from '../../../../asset/profile.png';

function AuthTask({ authData, setAuthData }) {
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const imgRef = useRef();

  const imageHandler = async (e) => {
    if (!e.target.files) {
      alert('이미지를 업로드해주세요');
    }
    // console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    await request
      .post(
        `/api/task-check/image?file-size=${e.target.files[0].size}`,
        formData
      )
      .then((res) => {
        // console.log(res);
        setImage(res.data.data);
        setAuthData({ ...authData, image: res.data.data });
      })
      .catch((err) => console.log(err));
  };
  // console.log(image);

  const uploadHandler = (e) => {
    e.preventDefault();
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  };

  const changeHandler = (e) => {
    setContent(e.target.value);
    setAuthData({ ...authData, content: content });
  };

  // console.log(authData);

  return (
    <form encType="multipart/form-data">
      <section>
        <div htmlFor="file" css={imageTitle}>
          사진 인증하기
          <span className="noEdit">한 번 인증하면 수정할 수 없습니다</span>
        </div>
        <input
          css={imgInput}
          ref={imgRef}
          type="file"
          id="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={imageHandler}
          required
        />
      </section>
      <section css={writingSection}>
        <img src={image ? image : porfile} alt="auth_image" css={authImage} />
        <button onClick={uploadHandler} css={uploadButton}>
          이미지 업로드
        </button>
      </section>
      <div htmlFor="writing" css={writingTitle}>
        인증 글 작성하기
      </div>
      <textarea
        type="text"
        value={content}
        placeholder="수행한 테스크에 대해 간락하게 설명해주세요"
        onChange={changeHandler}
        css={writingInput}
      />
    </form>
  );
}

export default AuthTask;

// const imageSection = css`
//   display: flex;
// `;

const imageTitle = css`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  span {
    font-size: 12px;
    color: #999999;
  }
`;

const imgInput = css`
  display: none;
`;

const authImage = css`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border: 1px solid #d1d1d1;
`;

const uploadButton = css`
  width: 79%;
  position: absolute;
  height: 30px;
  bottom: 36.3%;
  left: 0;
  margin-left: 57px;
  border: none;
  border-radius: 0 0 5px 5px;
  background-color: #0b6ff2;
  color: #ffffff;
  font-weight: 500;
`;

const writingSection = css`
  display: flex;
  flex-direction: column;
`;

const writingTitle = css`
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 5px;
`;

const writingInput = css`
  width: 100%;
  height: 100px;
  border: 1px solid #d1d1d1;
  resize: none;
  border-radius: 5px;
  padding: 0.5rem;
`;
