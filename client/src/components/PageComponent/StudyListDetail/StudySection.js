import { css } from '@emotion/react';
// import { useNavigate } from 'react-router-dom';

function StudySection() {
  // const navigate = useNavigate();

  return (
    <div
      css={css`
        border: 1px solid yellow;
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

          .period,
          span:nth-child(2) {
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
          <span className="title">Title</span>
          <button
            css={css`
              background-color: #ffffff;
              color: #0f6ad4;
            `}
            // onClick={() => navigate('/studylist/modify/:id')}
          >
            수정
          </button>
          <button
            css={css`
              background-color: #6a6464;
              color: #ffffff;
            `}
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
          <span className="period">2022.09.10 ~ 2022.09.20</span>
          <span>5명</span>
          <span>사진 김코딩</span>
        </div>
      </div>
      <div>
        <div className="detail_title">스터디 요약</div>
        <div className="study_content">
          한달 동안 모딥다를 공부하며 기술면접을 준비합니다. 자바스크립트 할 줄
          아시면 누구나 환영합니다. 한달 동안 모딥다를 공부하며 기술면접을
          준비합니다. 자바스크립트 할 줄 아시면 누구나 환영합니다.한달 동안
          모딥다를 공부하며 기술면접을 준비합니다. 자바스크립트 할 줄 아시면
          누구나 환영합니다.
        </div>
      </div>
      <div>
        <div className="detail_title">스터디 상세 설명</div>
        <div className="study_content">
          안녕하세요, 저는 모꼬스터디의 스터디장인 김코딩입니다. 저희 모꼬
          스터디는 2022년 9월 19일부터 2022년 10월 19일까지 한 달동안 진행되는
          스터디로, 모딥다를 함께 공부하고 토론하며 기술 면접을 준비하는
          스터디입니다. 자바스크립트 공부에 관심이 있으신 분이라면 누구나
          환영합니다! 저희 스터디는 주 3회, 월 수 금 오후 10시부터 12시까지
          비대면으로 진행할 예정이며, 참여하고 싶으신 분들은 댓글로 자기소개를
          간단히 적어주시면 됩니다! 궁금하신 점은 댓글로 바로 물어봐주시면 답변
          드리겠습니다.
        </div>
      </div>
      <div>
        <div className="detail_title">스터디 규칙</div>
        <div className="study_content">
          주 3회 오후 10시부터 12시까지 진행
          <br />주 1회 금요일 오후 10시에 전체 회의 참가
          <br />
          채팅은 오후 12시 이후 금지
        </div>
      </div>
      <div
        css={css`
          padding-bottom: 118px;

          .task_container {
            font-size: 25px;
            padding-bottom: 23px;
            border-bottom: 2px solid black;
          }

          .task_box {
            height: 88px;
            background-color: #f0f8ff;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 36px;

            .study_rule {
              font-size: 18px;
              font-weight: 500;
              color: #0b6ff2;
            }
          }

          .task_info {
            width: 1003px;
            height: 54px;
            background-color: #ffffff;
            display: flex;
            align-items: center;

            span {
              font-size: 15px;
              margin-left: 35px;
            }
          }
        `}
      >
        <div className="task_container">스터디 Task</div>
        <div className="task_box">
          <span className="study_rule">규칙1</span>
          <div className="task_info">
            <span>1일 1커밋 하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudySection;
