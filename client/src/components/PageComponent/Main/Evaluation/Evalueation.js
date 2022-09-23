import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { infoToEvalue } from '../../../../atom/atom';
import Star from './Star';

const Date = css`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
`;

const Container = css`
  width: 427px;
  height: 60px;
  background: #f0f8ff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 12px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function Evaluation({ arr }) {
  const studyInfo = useRecoilValue(infoToEvalue);
  // const [lastArr, setLastArr] = useState([]);
  // const user = useRecoilValue(userInfoState);
  console.log(studyInfo);

  let obj;
  let lastArr;

  const fnc = (ratingIndex, member) => {
    //star 컴포넌트에서 각 멤버 점수 가져옴
    console.log(
      `'점수' ${ratingIndex}'멤버아이디' ${member} 스터디아이디 ${studyInfo.studyId}`
    );

    obj = {
      memberId: member,
      evaluation: ratingIndex,
    };

    useEffect(() => {
      console.log(obj);
      arr.push(obj);
      console.log(arr);

      function isSame(arr, obj) {
        //같은 아이디 체크하는 함수 따로 만듦
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].memberId === obj.memberId) {
            return i;
          }
        }
        return -1;
      }

      function getLastArr() {
        var resultArr = [];
        for (let i = 0; i < arr.length; i++) {
          let idx = isSame(resultArr, arr[i]);
          if (idx !== -1) {
            resultArr[idx].evaluation = arr[i].evaluation;
          } else {
            resultArr.push(arr[i]);
          }
        }
        console.log(resultArr);
        lastArr = resultArr.filter((el) => el.evaluation !== 0); //이전에 눌렸던 스터디 정보가 0점으로 같이 읽혀서 0인 경우 뺌
        console.log(lastArr);
      }
      getLastArr();
    }, [obj]);
  };

  return (
    <div>
      <div css={Date}>{studyInfo.endDate}까지</div>
      {studyInfo.memberList ? (
        studyInfo.memberList.map(({ memberId, nickname }) => (
          <div key={memberId}>
            <div css={Container}>
              <span>{nickname}</span>
              <Star member={memberId} fnc={fnc} />
            </div>
          </div>
        ))
      ) : (
        <div>멤버 없음</div>
      )}
    </div>
  );
}

export default Evaluation;

//스터디원 수만큼  map

// const evaluate = (studyData) => { API아직 안만들어짐
// 알럿 띄우고 제출 됐으면 모달 닫기.
// }

// {
//   "studyId" : 1,
//   "memberId" : 2,
//   "evaluations": [
//       {
//           "memberId": 1,
//           "evaluation": 5
//       },
//       {
//           "memberId": 3,
//           "evaluation": 3
//       },
//       {
//           "memberId": 4,
//           "evaluation": 4
//       }
//   ]
// }'
