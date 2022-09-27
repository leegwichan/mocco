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
  const [authData, setAuthData] = useState({
    image: '',
    content: '',
    taskId: task.taskId,
    memberId: userInfo.memberId,
  });
  const [authContent, setAuthContent] = useState({});
  console.log(authContent);

  console.log(task);

  const authHandler = () => {
    request.post(`/api/task-check`, authData).then(() => {
      // console.log(res.data.data);
      getAuthTask();
    });
    // console.log('먹힘');
  };

  const getAuthTask = () => {
    request(`/api/task-check/1`).then((res) => {
      // console.log('먹힘', res);
      setAuthContent(res.data.data);
    });
  };
  console.log(authContent);

  useEffect(() => {
    getAuthTask();
  }, [task.taskCheck.taskCheckId]);

  const onClose = () => {
    setIsOpen(false);
    // console.log('클릭됨');
  };

  return (
    <div>
      {select.nickname === userInfo.nickname ? (
        <Modal
          onClose={onClose}
          style={{
            content: { width: 'auto', height: 'auto', borderRadius: '20px' },
          }}
        >
          <ModalContent
            text={`${task.content} 인증`}
            content={
              task.taskCheck.taskCheckId ? (
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
            firstBtnText={task.taskCheck.taskCheckId ? null : '인증'}
            secondBtnText={'닫기'}
            setIsOpen={setIsOpen}
            onClick={task.taskCheck.taskCheckId ? null : authHandler}
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
