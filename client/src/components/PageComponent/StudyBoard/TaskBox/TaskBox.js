import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import SelectUser from './SelectUser';
import TaskItem from './TaskItem';
import request from '../../../../api';
import { userInfoState, mypageOwnerAtom } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';
import UserProgressBar from './UserProgressBar';
import { useNavigate } from 'react-router-dom';

function TaskBox({ studyInfo, studyId, setSelectedId }) {
  const userInfo = useRecoilValue(userInfoState);
  const [select, setSelect] = useState({
    memberId: userInfo.memberId,
    nickname: userInfo.nickname,
    profileImage: userInfo.profileImage,
  });
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const myPageOwner = useRecoilValue(mypageOwnerAtom);

  // task가 날짜순으로 들어오도록 구현
  const taskHandler = () => {
    request(`/api/study-progress/sub/${studyId}/member/${select.memberId}`)
      .then((res) => {
        console.log(res);
        return res.data.data.taskList.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      })
      .then((res) => {
        setTaskList(res);
        console.log(res);
        // console.log(res);
      })
      .catch((err) => {
        if (err.response.data.message === '스터디의 멤버가 아닙니다.') {
          navigate(`/main/${myPageOwner.memberId}`);
          alert(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    taskHandler();
    setSelectedId(select.memberId);
  }, [select]);

  return (
    <div css={taskBox}>
      <div css={taskTop}>
        <div>Task</div>
        <div>
          <UserProgressBar
            taskList={taskList}
            total={taskList.length}
            select={select.memberId}
          />
        </div>
        <SelectUser
          memberInfo={studyInfo.memberList}
          select={select}
          setSelect={setSelect}
        />
      </div>
      <div css={tasks}>
        {taskList &&
          taskList.map((task) => (
            <div key={task.taskId}>
              <TaskItem
                task={task}
                select={select}
                taskHandlerf={taskHandler}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default TaskBox;

const taskBox = css`
  background-color: #f0f8ff;
  padding: 50px;
`;

const taskTop = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;

  div:nth-of-type(1) {
    font-size: 40px;
    font-weight: 600;
  }
`;

const tasks = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
