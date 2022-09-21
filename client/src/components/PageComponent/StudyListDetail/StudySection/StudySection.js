import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../../../api';
import StudyItem from './StudyItem';

function StudySection() {
  const { id } = useParams();
  const [studyInfo, setStudyInfo] = useState({});
  const [memberInfo, setMemberInfo] = useState({});
  const [taskInfo, setTaskInfo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getStudyInfo();
  }, [isEdit]);

  //edit이 변경될때만 getStudyInfo 함수가 실행되도록 하려고 했지만 실패 (React.memo, useMemo, useCallback 등)
  const getStudyInfo = () => {
    request(`/api/study-info/board/${id}`)
      //   .then((res) => {
      //     delete res.data.data.commentList;
      //     return res;
      //   })
      .then((res) => {
        console.log('나는 전체 데이터', res);
        setStudyInfo(res.data.data);
        setMemberInfo(res.data.data.member);
        setTaskInfo(res.data.data.taskList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <StudyItem
        studyInfo={studyInfo}
        id={id}
        memberInfo={memberInfo}
        taskInfo={taskInfo}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
}

export default StudySection;
