import { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../components/Common/Button';
import { singleStudyState } from '../atom/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../api/index';

function ModifyStudy() {
  const studyInfo = useRecoilValue(singleStudyState);
  const [editContent, setEditContent] = useState({
    teamName: studyInfo.teamName,
    startDate: studyInfo.startDate,
    endDate: studyInfo.endDate,
    capacity: studyInfo.capacity,
    summary: studyInfo.summary,
    detail: studyInfo.detail,
    rule: studyInfo.rule,
  });
  const [editTask, setEditTask] = useState(studyInfo.taskList);
  const navigate = useNavigate();
  const { id } = useParams();

  const { teamName, startDate, endDate, capacity, summary, detail, rule } =
    editContent;

  const onEditChange = (e) => {
    const { value, name } = e.target;
    setEditContent({
      ...editContent,
      [name]: value,
    });
  };

  const editHandler = (e) => {
    e.preventDefault();
    request.patch(`/api/study-board/${id}`, editContent).then((res) => {
      console.log(res);
      console.log(editContent);
      window.location.replace(`/studylist/detail/${id}`);
    });
  };

  return (
    <main css={main_container}>
      <div css={content_container}>
        <section css={edit_title}>
          <div>스터디 공고 수정하기</div>
        </section>
        <section>
          <form action="submit">
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
            <div css={task_container}>
              <div css={task_top}>
                <div>스터디 TASK</div>
                <Button type={'big_blue'} text={'Task 추가하기'} />
              </div>
              <ul>
                {editTask &&
                  editTask.map((task, idx) => (
                    <div
                      css={css`
                        display: flex;
                        margin-bottom: 40px;
                      `}
                      key={task.taskId}
                    >
                      <div css={delete_btn}>
                        <button>❌</button>
                      </div>
                      <div css={task_title}>
                        <span>Task {idx + 1}</span>
                      </div>
                      <div css={task_input}>
                        <input type="text" value={task.contnet} />
                        <input type="date" value={task.endline} />
                      </div>
                    </div>
                  ))}
              </ul>
            </div>
            <div
              css={css`
                text-align: right;
              `}
            >
              <Button
                type={'big_grey'}
                text={'취소'}
                onClick={() => navigate(`/studylist/detail/${id}`)}
              />

              <Button
                type={'big_blue'}
                text={'스터디 수정하기'}
                onClick={editHandler}
              />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default ModifyStudy;

const main_container = css`
  width: 100vw;
  height: calc(100vh - 64px);
  padding-top: 60px;
`;

const content_container = css`
  max-width: 1200px;
  margin: 0 auto;
`;

const edit_title = css`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 30px;
`;

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

const task_container = css`
  margin-top: 30px;
  margin-bottom: 120px;
`;

const task_top = css`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;

  div {
    display: inline-block;
    border-bottom: 3px solid #0b6ff2;
    font-size: 2rem;
  }
`;

const delete_btn = css`
  display: flex;
  margin-right: 0.5rem;
  align-items: flex-start;

  button {
    font-size: 20px;
    line-height: 40px;
    border: none;
    background-color: white;
  }
`;

const task_title = css`
  display: inline-block;
  height: 100%;
  margin-right: 1rem;
  margin-top: -10px;

  span {
    color: #0b7ff2;
    font-size: 40px;
  }
`;

const task_input = css`
  display: inline-block;
  flex: 1 0;

  input:nth-of-type(1) {
    display: block;
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    padding: 0 1rem;
    font-size: 1.2rem;
    border: 1px solid #999999;
    border-radius: 5px;
  }

  input:nth-of-type(2) {
    display: block;
    height: 44px;
    margin-top: 10px;
    padding: 0 1rem;
    font-size: 1.2rem;
    border: 1px solid #999999;
    border-radius: 5px;
  }
`;
