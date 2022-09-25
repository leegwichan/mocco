import { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../components/Common/Button';
import { singleStudyState } from '../atom/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../api/index';
import ModifyTaskItem from '../components/PageComponent/ModifyStudy/ModifyTaskItem';

function ModifyStudy() {
  const navigate = useNavigate();
  const { id } = useParams();
  const studyInfo = useRecoilValue(singleStudyState);
  const [editContent, setEditContent] = useState({
    teamName: studyInfo.teamName,
    startDate: studyInfo.startDate,
    endDate: studyInfo.endDate,
    capacity: studyInfo.capacity,
    summary: studyInfo.summary,
    detail: studyInfo.detail,
    rule: studyInfo.rule,
    taskList: studyInfo.taskList,
  });

  const arr = [];
  for (var task of studyInfo.taskList) {
    arr.push({ content: task.content, deadline: task.deadline, studyId: id });
  }
  const [taskArr, setTaskArr] = useState([...arr]);

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
    for (var task of editContent.taskList) {
      if (task.content === null || task.deadline === null) {
        alert('task를 입력해주세요');
      }
    }
    request
      .patch(`/api/study-board/${id}`, editContent)
      .then(() => {
        window.location.replace(`/studylist/detail/${id}`);
      })
      .catch((err) => {
        if (err.response.data.message !== undefined) {
          alert(err.response.data.message);
        }
      });
  };

  // 기존 input은 기존 값들 defaultValue로, 추가한 input은 null로
  const newTaskInfo = {
    content: null,
    deadline: null,
    studyId: id,
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    setTaskArr([...taskArr, { ...newTaskInfo }]);
    console.log(taskArr);
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
                <Button
                  type={'big_blue'}
                  text={'Task 추가하기'}
                  onClick={addTaskHandler}
                />
              </div>
              <ul>
                {taskArr.map((task, idx) => {
                  return (
                    <ModifyTaskItem
                      key={idx}
                      setEditContent={setEditContent}
                      editContent={editContent}
                      taskArr={taskArr}
                      setTaskArr={setTaskArr}
                      task={task}
                      idx={idx}
                    />
                  );
                })}
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
