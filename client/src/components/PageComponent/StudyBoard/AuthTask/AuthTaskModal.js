import { useState, useEffect } from 'react';
import Modal from '../../../Common/Modal';
import { ModalContent, OneModalContent } from '../../../Common/ModalContent';
import { css } from '@emotion/react';
import AuthTask from './AuthTask';
import request from '../../../../api';
import { userInfoState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';

function AuthTaskModal({
  task,
  setIsOpen,
  select,
  taskHandlerf,
  getStudyInfof,
}) {
  const userInfo = useRecoilValue(userInfoState);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authData, setAuthData] = useState({
    image: '',
    content: '',
    taskId: task.taskId,
    memberId: userInfo.memberId,
  });
  const [authContent, setAuthContent] = useState({});

  const authHandler = () => {
    if (authData.image === '') {
      alert('인증 이미지를 삽입해주세요');
      return;
    }
    if (authData.content.length >= 300) {
      alert('300자 이내로 입력해주세요');
      return;
    } else {
      request
        .post('/api/task-check', authData)
        .then((res) => {
          console.log(res.data.data);
          setAuthContent(res.data.data);
          console.log(authContent);
        })
        .then(() => setIsAuthOpen(true))
        .then(() => taskHandlerf())
        .catch((err) => alert(err.response.data.message));
    }
  };

  // 닫기 버튼을 눌렀을 때 애니메이션 움직일 수 있도록 구현
  const getAuth = () => {
    setIsOpen(false);
    getStudyInfof();
  };
  console.log(task);

  const getAuthTask = () => {
    request(`/api/task-check/${task.taskCheck.taskCheckId}`).then((res) => {
      console.log('먹힘', res);
      setAuthContent(res.data.data);
    });
  };
  console.log(authContent);
  console.log('task', task);

  useEffect(() => {
    if (task.taskCheck.taskCheckId !== null) {
      getAuthTask();
    }
  }, [task.taskCheck.taskCheckId]);

  const onClose = () => {
    setIsOpen(false);
    console.log('클릭됨');
  };

  return (
    <div>
      {select.nickname === userInfo.nickname && (
        <Modal
          onClose={onClose}
          style={{
            content: { width: 'auto', height: 'auto', borderRadius: '20px' },
          }}
        >
          {!isAuthOpen && !task.taskCheck.taskChecked && (
            <ModalContent
              text={`${task.content} 인증`}
              content={
                <AuthTask authData={authData} setAuthData={setAuthData} />
              }
              firstBtnType={'small_blue'}
              secondBtnType={'small_grey'}
              firstBtnText={'인증'}
              secondBtnText={'닫기'}
              setIsOpen={setIsOpen}
              onClick={authHandler}
            />
          )}
          {task.taskCheck.taskChecked && (
            <OneModalContent
              text={`${task.content} 인증`}
              content={
                <div>
                  <img
                    src={authContent.image}
                    alt="auth_image"
                    css={authImage}
                  />
                  <div css={authWriting}>{authContent.content}</div>
                </div>
              }
              btnType={'small_grey'}
              btnText={'닫기'}
              onClick={getAuth}
            />
          )}
        </Modal>
      )}
      {select.nickname !== userInfo.nickname && task.taskCheck.taskChecked && (
        <Modal>
          <OneModalContent
            text={`${task.content} 인증`}
            content={
              <div>
                <img src={authContent.image} alt="auth_image" css={authImage} />
                <div css={authWriting}>{authContent.content}</div>
              </div>
            }
            btnType={'small_grey'}
            btnText={'닫기'}
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AuthTaskModal;

const authImage = css`
  height: 280px;
  width: 100%;
  margin-bottom: 10px;

  @media all and (max-width: 1000px) {
    height: 258px;
  }

  @media all and (max-width: 900px) {
    height: 220px;
  }

  @media all and (max-width: 800px) {
    height: 190px;
  }
`;

const authWriting = css`
  height: 75px;
  overflow: auto;
  word-break: break-all;
  font-size: 18px;

  @media all and (max-width: 1000px) {
    font-size: 15px;
    height: 50px;
  }

  @media all and (max-width: 800px) {
    height: 40px;
    font-size: 13px;
  }
`;
