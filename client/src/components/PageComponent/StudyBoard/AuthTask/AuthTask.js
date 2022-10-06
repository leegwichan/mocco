import { css } from '@emotion/react';
import { useRef } from 'react';
import request from '../../../../api';

function AuthTask({ authData, setAuthData }) {
  const imgRef = useRef();

  const imageHandler = async (e) => {
    if (!e.target.files) {
      alert('이미지를 업로드해주세요');
    }

    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    await request
      .post(
        `/api/task-check/image?file-size=${e.target.files[0].size}`,
        formData
      )
      .then((res) => {
        // console.log(res);
        setAuthData({ ...authData, image: res.data.data });
      })
      .catch((err) => alert(err.response.data.message));
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  };

  const changeHandler = (e) => {
    setAuthData({ ...authData, content: e.target.value });
  };

  // console.log('어쓰', authData);

  return (
    <form encType="multipart/form-data">
      <section>
        <label htmlFor="file" css={imageTitle}>
          사진 인증하기
          <span className="noEdit">한 번 인증하면 수정할 수 없습니다</span>
        </label>
        <input
          css={imgInput}
          ref={imgRef}
          type="file"
          id="file"
          accept="image/jpg,image/png"
          name="file"
          onChange={imageHandler}
          required
        />
      </section>
      <section css={writingSection}>
        <img
          src={authData.image ? authData.image : '/no_image.jpeg'}
          alt="auth_image"
          css={authImage}
        />
        <button onClick={uploadHandler} css={uploadButton}>
          이미지 업로드
        </button>
      </section>
      <div htmlFor="writing" css={writingTitle}>
        인증 글 작성하기
      </div>
      <textarea
        type="text"
        value={authData.content}
        placeholder="수행한 테스크에 대해 간락하게 설명해주세요"
        onChange={changeHandler}
        css={writingInput}
      />
    </form>
  );
}

export default AuthTask;

const imageTitle = css`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  span {
    font-size: 12px;
    color: #999999;
  }

  @media all and (max-width: 1023px) {
    font-size: 13px;

    span {
      font-size: 11px;
    }
  }
`;

const imgInput = css`
  display: none;
`;

const authImage = css`
  position: relative;
  width: 100%;
  height: 170px;
  overflow: hidden;
  border: 1px solid #d1d1d1;

  @media all and (max-width: 1023px) {
    height: 140px;
  }

  @media all and (max-width: 900px) {
    height: 120px;
  }

  @media all and (max-width: 800px) {
    height: 100px;
  }
`;

const uploadButton = css`
  width: 79%;
  position: absolute;
  height: 30px;
  bottom: 38%;
  left: 0;
  margin-left: 57px;
  border: none;
  border-radius: 0 0 5px 5px;
  background-color: #0b6ff2;
  color: #ffffff;
  font-weight: 500;

  @media all and (max-width: 1023px) {
    margin-left: 50px;
    bottom: 44%;
  }

  @media all and (max-width: 900px) {
    margin-left: 45px;
    bottom: 41%;
  }

  @media all and (max-width: 800px) {
    margin-left: 40px;
    bottom: 38%;
  }

  @media all and (max-width: 743px) {
    margin-left: 35px;
    bottom: 40%;
  }
`;

const writingSection = css`
  display: flex;
  flex-direction: column;
`;

const writingTitle = css`
  font-size: 15px;
  margin-top: 37px;
  margin-bottom: 3px;

  @media all and (max-width: 1023px) {
    font-size: 13px;
    margin-top: 37px;
  }

  @media all and (max-width: 935px) {
    margin-top: 33px;
  }

  @media all and (max-width: 862px) {
    margin-top: 31px;
  }
`;

const writingInput = css`
  width: 100%;
  height: 100px;
  border: 1px solid #d1d1d1;
  resize: none;
  border-radius: 5px;
  padding: 0.5rem;
  outline: none;
  ::-webkit-scrollbar {
    display: none;
  }

  @media all and (max-width: 862px) {
    height: 80px;
  }

  @media all and (max-width: 825px) {
    height: 63px;
  }
`;
