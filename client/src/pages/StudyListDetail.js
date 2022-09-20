import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import StudySection from '../components/PageComponent/StudyListDetail/StudySection';
import TabSection from '../components/PageComponent/StudyListDetail/TabSection';
import request from '../api/index';

function StudyListDetail() {
  const { id } = useParams();
  const [studyInfo, setStudyInfo] = useState({});
  const [memberInfo, setMemberInfo] = useState({});
  const [taskInfo, setTaskInfo] = useState([]);

  useEffect(() => {
    getStudyInfo();
  }, []);

  const getStudyInfo = () => {
    return request(
      `/api/study-info/board/${id}
    `
    ).then((res) => {
      console.log(res);
      setStudyInfo(res.data.data);
      setMemberInfo(res.data.data.member);
      setTaskInfo(res.data.data.taskList);
    });
  };
  // console.log('task', taskInfo);

  return (
    <div
      css={css`
        max-width: 1200px;
        margin: auto;
        margin-top: 170px;
      `}
    >
      <StudySection
        studyInfo={studyInfo}
        id={id}
        memberInfo={memberInfo}
        taskInfo={taskInfo}
      />
      <TabSection />
    </div>
  );
}

export default StudyListDetail;
