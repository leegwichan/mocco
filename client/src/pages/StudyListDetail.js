import { css } from '@emotion/react';
// import StudySection from '../components/PageComponent/StudyListDetail/StudySection/StudySection';
import TabSection from '../components/PageComponent/StudyListDetail/TabSection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import request from '../api';
import StudyItem from '../components/PageComponent/StudyListDetail/StudySection/StudyItem';
import { singleStudyState } from '../atom/atom';
import { useRecoilState } from 'recoil';

function StudyListDetail() {
  const { id } = useParams();
  const [studyInfo, setStudyInfo] = useRecoilState(singleStudyState);
  // const [memberInfo, setMemberInfo] = useState({});
  // const [taskInfo, setTaskInfo] = useState([]);
  // const [isEdit, setIsEdit] = useState(false);

  const getStudyInfo = () => {
    request(`/api/study-info/board/${id}`)
      .then((res) => {
        console.log('나는 전체 데이터', res);
        setStudyInfo(res.data.data);
        console.log(studyInfo);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudyInfo();
  }, [id]);

  return (
    <div
      css={css`
        max-width: 1200px;
        margin: auto;
        margin-top: 170px;
      `}
    >
      <StudyItem
        id={id}
        // studyInfo={studyInfo}
        // memberInfo={memberInfo}
        // taskInfo={taskInfo}
      />
      <TabSection />
    </div>
  );
}

export default StudyListDetail;
