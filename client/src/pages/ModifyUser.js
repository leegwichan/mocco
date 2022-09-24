import request from '../api';

function ModifyUser() {
  const content = {
    teamName: '수정된 팀네임',
    summary: 'react 공부할 사람 모집 수정',
    detail:
      '안녕하세요! 프론트엔드 개발자가 되기 위해 react 같이 공부할 사람 모집합니다!!!! 수정',
    rule: '주 1회 스터디 참석',
    taskList: [
      {
        content: 'toy project 1개 완성하기 수정됨',
        deadline: '2022-10-20',
        studyId: 329,
      },
    ],
    startDate: '2022-09-28',
    endDate: '2022-10-30',
  };

  request.patch(`/api/study-board/329`, content).then((res) => {
    console.log(res);
  });
  return <div>ModifyUser</div>;
}

export default ModifyUser;
