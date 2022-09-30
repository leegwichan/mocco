import { useState, useEffect } from 'react';
import Modal from '../../../Common/Modal';
import ModalContent from '../../../Common/ModalContent';
import { css } from '@emotion/react';
import AuthTask from './AuthTask';
import request from '../../../../api';
import { userInfoState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';

function AuthTaskModal({ task, setIsOpen, select }) {
  const userInfo = useRecoilValue(userInfoState);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authData, setAuthData] = useState({
    image: '',
    content: '',
    taskId: task.taskId,
    memberId: 1,
  });
  const [authContent, setAuthContent] = useState({});

  const authHandler = () => {
    if (authData.image === '') {
      alert('인증 이미지를 삽입해주세요');
      return;
    } else {
      request
        .post('/api/task-check', authData)
        .then((res) => {
          console.log(res.data.data);
          setIsAuthOpen(true);
          setAuthContent(res.data.data);
          console.log(setAuthContent);
        })
        // .then((res) => {
        //   console.log(res.data.data.taskCheck.taskCheckId);
        //   getAuthTask();
        // })
        // .then(() => setIsAuthOpen(true))

        .catch((err) => alert(err.response.data.message));
    }
  };

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
    request(`/api/study-info/study-count`).then((res) =>
      console.log('개수', res)
    );
  }, []);

  const onClose = () => {
    setIsOpen(false);
    console.log('클릭됨');
  };

  return (
    <div>
      {select.nickname !== userInfo.nickname ? (
        <Modal
          onClose={onClose}
          style={{
            content: { width: 'auto', height: 'auto', borderRadius: '20px' },
          }}
        >
          <ModalContent
            text={`${task.content} 인증`}
            content={
              task.taskCheck.taskCheckId || isAuthOpen ? (
                <div>
                  <img
                    src={authContent.image}
                    alt="auth_image"
                    css={authImage}
                  />
                  <div>{authContent.content}</div>
                </div>
              ) : (
                <AuthTask authData={authData} setAuthData={setAuthData} />
              )
            }
            firstBtnType={'small_blue'}
            secondBtnType={'small_grey'}
            firstBtnText={
              task.taskCheck.taskCheckId || isAuthOpen ? '완료' : '인증'
            }
            secondBtnText={'닫기'}
            setIsOpen={setIsOpen}
            onClick={
              task.taskCheck.taskCheckId || isAuthOpen ? null : authHandler
            }
          />
        </Modal>
      ) : (
        <div>
          {task.taskCheck.taskCheckId && (
            <Modal>
              <ModalContent
                text={`${task.content} 인증`}
                content={
                  <div>
                    <img
                      src={authContent.image}
                      alt="auth_image"
                      css={authImage}
                    />
                    <div>{authContent.content}</div>
                  </div>
                }
                firstBtnType={'small_blue'}
                firstBtnText={'완료'}
                secondBtnType={'small_grey'}
                secondBtnText={'닫기'}
                setIsOpen={setIsOpen}
              />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default AuthTaskModal;

const authImage = css`
  height: 280px;
  margin-bottom: 10px;
`;
