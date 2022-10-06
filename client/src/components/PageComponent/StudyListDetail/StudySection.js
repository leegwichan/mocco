import { css } from '@emotion/react';
import { singleStudyState, userInfoState } from '../../../atom/atom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import request from '../../../api';
import TaskItem from './TaskItem';
import Button from '../../Common/Button';
import StudyMember from './StudyMember';

const StudySection = ({ id }) => {
  const studyInfo = useRecoilValue(singleStudyState);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  const deleteHandler = () => {
    // if (studyInfo.member.memberId !== userInfo.memberId) {
    //   alert('권한이 없습니다');
    // } else {
    return request.delete(`/api/study-board/${id}`).then(() => {
      navigate('/studylist');
    });
    // }
  };

  const editHandler = () => {
    navigate(`/studylist/modify/${id}`);
  };

  return (
    <div>
      <div css={container}>
        <section css={topContainer}>
          <div css={titleContainer}>
            <div css={title}>{studyInfo.teamName}</div>
            {userInfo !== null &&
              studyInfo.member?.memberId === userInfo.memberId && (
                <div className="btn">
                  <Button
                    type={'small_white'}
                    text={'수정'}
                    onClick={editHandler}
                  />
                  <Button
                    type={'small_grey'}
                    text={'삭제'}
                    onClick={deleteHandler}
                  />
                </div>
              )}
          </div>
          <div css={info}>
            <span className="info">{`${studyInfo.startDate} ~ ${studyInfo.endDate}`}</span>
            <span className="info">{`${studyInfo.capacity}명`}</span>
            {studyInfo.member?.nickname ? <StudyMember /> : null}
          </div>
        </section>
        <div>
          <div className="detail_title">스터디 요약</div>
          <hr />
          <div
            className="study_content"
            css={css`
              white-space: pre-wrap;
              word-wrap: break-word;
            `}
          >
            {studyInfo.summary}
          </div>
        </div>
        <div>
          <div className="detail_title">스터디 상세 설명</div>
          <hr />
          <div
            className="study_content"
            css={css`
              white-space: pre-wrap;
              word-wrap: break-word;
            `}
          >
            {studyInfo.detail}
          </div>
        </div>
        <div>
          <div className="detail_title">스터디 규칙</div>
          <hr />
          <div
            className="study_content"
            css={css`
              white-space: pre-wrap;
              word-wrap: break-word;
            `}
          >
            {studyInfo.rule}
          </div>
        </div>
        <div css={taskContainer}>
          <div className="task_title">스터디 Task</div>
          <hr />
          {studyInfo.taskList &&
            studyInfo.taskList.map((task, idx) => (
              <TaskItem task={task} key={task.taskId} idx={idx} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudySection;

const container = css`
  display: flex;
  flex-direction: column;

  .detail_title {
    font-size: 25px;
    padding-bottom: 15px;
  }

  .study_content {
    font-size: 20px;
    padding-top: 36px;
    margin-bottom: 118px;
  }

  hr {
    box-shadow: 0px 0px 5px 3px rgb(0 0 0 / 5%);
    height: 5px;
    border: 0;
    background: #d1d1d1;
  }

  @media all and (max-width: 768px) {
    .detail_title {
      font-size: 1.3rem;
      font-weight: 500;
    }

    .study_content {
      font-size: 1.1rem;
      padding-top: 16px;
    }
  }
`;

const topContainer = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
`;

const titleContainer = css`
  display: flex;

  .btn {
    padding-top: 10px;

    button {
      @media all and (max-width: 768px) {
        margin-left: 0px;
        margin-right: 5px;
        font-size: 15px;
        height: 35px;
        width: 48px;
      }
    }
  }

  @media all and (max-width: 768px) {
    flex-direction: column;
  }
`;

const title = css`
  font-size: 35px;
  margin-right: 37px;
  color: #000000;

  @media all and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const info = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .info {
    font-size: 25px;
    color: #066ff2;
    margin-bottom: 16px;
  }

  @media all and (max-width: 768px) {
    .info {
      font-size: 1.3rem;
      margin-top: 10px;
    }
  }
`;

const taskContainer = css`
  padding-bottom: 118px;

  .task_title {
    font-size: 25px;
    padding-bottom: 15px;
  }

  @media all and (max-width: 768px) {
    .task_title {
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

// const profile = css`
//   display: flex;
//   align-items: center;

//   .main_link {
//     color: black;
//     font-size: 20px;
//     &:hover {
//       cursor: pointer;
//       color: #066ff2;
//     }
//   }

//   @media all and (max-width: 768px) {
//     .main_link {
//       font-size: 15px;
//       font-weight: 500;
//     }
//   }
// `;

// const image = css`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
// `;
