import { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../components/Common/Button';
import { singleStudyState } from '../atom/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../api/index';
import ModifyTaskSection from '../components/PageComponent/ModifyStudy/ModifyTaskSection';
import ModifyStudySection from '../components/PageComponent/ModifyStudy/ModifyStudySection';
import Footer from '../components/Common/Footer';

function ModifyStudy() {
  const navigate = useNavigate();
  const { id } = useParams();
  const studyInfo = useRecoilValue(singleStudyState);
  const [editContent, setEditContent] = useState({
    teamName: studyInfo.teamName,
    startDate: studyInfo.startDate,
    endDate: studyInfo.endDate,
    image: studyInfo.image,
    capacity: studyInfo.capacity,
    summary: studyInfo.summary,
    detail: studyInfo.detail,
    rule: studyInfo.rule,
    taskList: studyInfo.taskList,
  });

  // studyInfo.taskList에서 taskId 제거하고 studyId 추가
  const arr = [];
  for (let task of studyInfo.taskList) {
    arr.push({ content: task.content, deadline: task.deadline, studyId: id });
  }
  const [taskArr, setTaskArr] = useState([...arr]);

  const { teamName, capacity, summary, detail, rule } = editContent;

  const editHandler = (e) => {
    e.preventDefault();
    for (let task of taskArr) {
      if (
        task.content === null ||
        task.deadline === null ||
        task.content > 100
      ) {
        alert('task는 100자 이하로 입력해야 합니다');
        return;
      }
    }
    if (teamName === '' || teamName > 30 || teamName < 2) {
      alert('스터디 이름은 2글자 이상 30자 이하로 입력해야 합니다');
      return;
    }
    if (capacity === '' || capacity > 5 || capacity < 2) {
      alert('스터디 정원은 2명 이상 5명 이하로 입력해야 합니다');
      return;
    }
    if (summary === '' || summary > 1500) {
      alert('요약글은 1500자 이상으로 입력해야 합니다');
      return;
    }
    if (detail === '' || detail > 5000) {
      alert('스터디 소개는 5000자 이하로 입력해야 합니다');
      return;
    }
    if (rule === '' || rule > 2000) {
      alert('스터디 규칙은 2000자 이하로 입력해야 합니다');
      return;
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

  return (
    <main css={main_container}>
      <div css={content_container}>
        <section css={edit_title}>
          <div>스터디 공고 수정</div>
        </section>
        <section>
          <form action="submit">
            <ModifyStudySection
              editContent={editContent}
              setEditContent={setEditContent}
            />
            <ModifyTaskSection
              setEditContent={setEditContent}
              editContent={editContent}
              taskArr={taskArr}
              setTaskArr={setTaskArr}
              id={id}
            />
            <div className="btn">
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
      <Footer />
    </main>
  );
}

export default ModifyStudy;

const main_container = css`
  width: 100vw;
  height: calc(100vh - 64px);
  padding-top: 100px;
`;

const content_container = css`
  max-width: 1260px;
  padding: 0 2rem;
  margin: 0 auto;

  .btn {
    text-align: right;

    @media all and (max-width: 768px) {
      button {
        font-size: 15px;
        height: 38px;
        padding: 0 20px;
      }
    }
  }
`;

const edit_title = css`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 30px;

  @media all and (max-width: 768px) {
    font-size: 2rem;
    font-weight: 500;
  }
`;
