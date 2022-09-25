import { css } from '@emotion/react';

function ModifyStudyItem({ editContent, setEditContent }) {
  const { teamName, startDate, endDate, capacity, summary, detail, rule } =
    editContent;

  const onEditChange = (e) => {
    const { value, name } = e.target;
    setEditContent({
      ...editContent,
      [name]: value,
    });
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
            <label htmlFor="summary">스터디 요약글</label>
            <textarea
              type="text"
              name="summary"
              defaultValue={summary}
              onChange={onEditChange}
            />
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

export default ModifyStudyItem;

const edit_container = css`
  display: flex;
  width: 100%;
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

  input {
    width: 100%;
    height: 45px;
    padding: 0 0.5rem;
    border: 1px solid #999999;
    border-radius: 5px;
    font-size: 1.2rem;
  }

  textarea {
    width: 100%;
    height: 147px;
    padding: 0.5rem;
    border: 1px solid #999999;
    border-radius: 5px;
    font-size: 1.3rem;
    resize: none;
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
    font-size: 30px;
    resize: none;
  }
`;
