import { css } from '@emotion/react';
import { useRef } from 'react';
import request from '../../../api';

function ModifyStudySection({ editContent, setEditContent }) {
  const {
    teamName,
    startDate,
    endDate,
    image,
    capacity,
    summary,
    detail,
    rule,
  } = editContent;

  const onEditChange = (e) => {
    const { value, name } = e.target;
    setEditContent({
      ...editContent,
      [name]: value,
    });
  };

  const imgRef = useRef();

  const imageHandler = async (e) => {
    if (!e.target.files) {
      alert('이미지를 업로드해주세요');
    }
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    await request
      .post(
        `/api/study-board/image?file-size=${e.target.files[0].size}`,
        formData
      )
      .then((res) => setEditContent({ ...editContent, image: res.data.data }))
      .then(() => console.log(editContent))
      .catch((err) => console.log(err));
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    if (!imgRef.current) {
      return;
    }
    imgRef.current.click();
  };

  return (
    <div>
      <div css={edit_container}>
        <div css={edit_left}>
          <div>
            <label htmlFor="teamName">스터디 이름</label>
            <input
              type="text"
              name="teamName"
              defaultValue={teamName}
              onChange={onEditChange}
            />
          </div>
          <div>
            <label htmlFor="capacity">스터디 정원</label>
            <input
              type="text"
              name="capacity"
              defaultValue={capacity}
              onChange={onEditChange}
            />
          </div>
          <div>
            <label htmlFor="startDate">스터디 시작일</label>
            <input
              type="date"
              name="startDate"
              defaultValue={startDate}
              onChange={onEditChange}
            />
          </div>
          <div>
            <label htmlFor="endDate">스터디 만료일</label>
            <input
              type="date"
              name="endDate"
              defaultValue={endDate}
              onChange={onEditChange}
            />
          </div>
        </div>
        <div css={edit_right}>
          <div css={detailContainer}>
            <label htmlFor="summary">스터디 요약글</label>
            <textarea
              type="text"
              name="summary"
              defaultValue={summary}
              onChange={onEditChange}
            />
          </div>
          <div css={imageContaier}>
            <div>
              <label htmlFor="image">스터디 대표 사진</label>
              <input
                type="file"
                name="image"
                ref={imgRef}
                accept="image/jpg, image/png"
                onChange={imageHandler}
                css={imgInput}
                required
              />
            </div>
            <div css={imageSection}>
              <img
                src={
                  image === null
                    ? 'https://avatars.githubusercontent.com/u/71388830?v=4'
                    : image
                }
                alt="스터디 대표 사진"
              />
              <button onClick={uploadHandler}>이미지 업로드</button>
            </div>
          </div>
        </div>
      </div>
      <div css={introduce_rule_container}>
        <div>
          <label htmlFor="detail">스터디 소개</label>
          <textarea
            type="text"
            name="detail"
            defaultValue={detail}
            onChange={onEditChange}
          />
        </div>
        <div>
          <label htmlFor="rule">스터디 규칙</label>
          <textarea
            type="text"
            name="rule"
            defaultValue={rule}
            onChange={onEditChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ModifyStudySection;

const edit_container = css`
  display: flex;
  width: 100%;

  @media all and (max-width: 768px) {
    flex-direction: column;
  }
`;

const edit_left = css`
  display: inline-flex;
  width: 45%;
  margin-right: 5%;
  flex-direction: column;

  label {
    display: block;
    margin: 1rem 0;
    font-size: 1.1rem;
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 0.5rem;
    border: 1px solid #999999;
    border-radius: 5px;
    font-size: 1.2rem;
  }

  @media all and (max-width: 768px) {
    order: 2;
    width: 100%;
    margin: 0 auto;
  }
`;

const edit_right = css`
  display: inline-flex;
  width: 45%;
  margin-left: 5%;
  flex-direction: column;

  label {
    display: block;
    margin: 1rem 0;
    font-size: 1.1rem;
  }

  @media all and (max-width: 768px) {
    order: 1;
    width: 100%;
    margin: 0 auto;
  }
`;

const detailContainer = css`
  flex: 4 0;

  textarea {
    width: 100%;
    height: calc(100% - 55px);
    padding: 0.5rem;
    border: 1px solid #999999;
    border-radius: 5px;
    font-size: 1.3rem;
    resize: none;
  }

  @media all and (max-width: 768px) {
    order: 2;
  }
`;

const imageContaier = css`
  flex: 6 0;

  @media all and (max-width: 768px) {
    order: 1;
  }
`;

const imgInput = css`
  display: none;
`;

const imageSection = css`
  position: relative;
  width: 100%;
  height: 208px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
  }

  button {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 0;
    left: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 0 0 5px 5px;
    background-color: #0b6ff2;
  }
`;

const introduce_rule_container = css`
  width: 100%;
  margin: 60px 0;

  label {
    display: inline-block;
    border-bottom: 3px solid #0b6ff2;
    font-size: 2rem;
  }

  textarea {
    display: block;
    width: 100%;
    height: 250px;
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #999999;
    border-radius: 5px;
    /* font-size: 30px; */
    font-size: 1.2rem;
    resize: none;
  }

  @media all and (max-width: 768px) {
    label {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
