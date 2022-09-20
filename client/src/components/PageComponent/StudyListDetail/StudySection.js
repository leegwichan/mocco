import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import request from '../../../api/index';
import Task from './Task';

function StudySection({ studyInfo, id, memberInfo, taskInfo }) {
  const navigate = useNavigate();

  const deleteHandler = () => {
    return request.delete(`/api/study-board/${id}`).then(() => {
      console.log('삭제합니다');
      navigate('/studylist');
    });
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

        .detail_title {
          font-size: 25px;
          padding-bottom: 23px;
          border-bottom: 2px solid black;
        }

        .study_content {
          font-size: 20px;
          padding-top: 36px;
          margin-bottom: 118px;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 17px;

          .title {
            font-size: 35px;
            margin-right: 37px;
            color: #000000;
          }

          button {
            width: 64px;
            height: 32px;
            border-radius: 5px;
            margin-right: 15px;
            border: none;
          }

          .info {
            font-size: 25px;
            color: #066ff2;
            margin-bottom: 16px;
          }

          span:last-child {
            font-size: 20px;
            color: #000000;
          }
        `}
      >
        <div>
          <span className="title">{studyInfo.teamName}</span>
          <button
            css={css`
              background-color: #ffffff;
              color: #0f6ad4;
            `}
            onClick={() => navigate(`/studylist/modify/${id}`)}
          >
            수정
          </button>
          <button
            css={css`
              background-color: #6a6464;
              color: #ffffff;
            `}
            onClick={deleteHandler}
          >
            삭제
          </button>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          `}
        >
          <span className="info">{`${studyInfo.startDate} ~ ${studyInfo.endDate}`}</span>
          <span className="info">{`${studyInfo.capacity}명`}</span>
          <span>{memberInfo.nickname}</span>
        </div>
      </div>
      <div>
        <div className="detail_title">스터디 요약</div>
        <div className="study_content">{studyInfo.summary}</div>
      </div>
      <div>
        <div className="detail_title">스터디 상세 설명</div>
        <div className="study_content">{studyInfo.detail}</div>
      </div>
      <div>
        <div className="detail_title">스터디 규칙</div>
        <div className="study_content">{studyInfo.rule}</div>
      </div>
      <div
        css={css`
          padding-bottom: 118px;

          .task_container {
            font-size: 25px;
            padding-bottom: 23px;
            border-bottom: 2px solid black;
          }
        `}
      >
        <div className="task_container">스터디 Task</div>
        {taskInfo &&
          taskInfo.map((task) => <Task task={task} key={task.taskId} />)}
      </div>
    </div>
  );
}

export default StudySection;
