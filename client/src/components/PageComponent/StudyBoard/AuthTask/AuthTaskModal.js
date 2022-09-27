import { useState } from 'react';
import Modal from '../../../Common/Modal';
import ModalContent from '../../../Common/ModalContent';
// import { css } from '@emotion/react';
import AuthTask from './AuthTask';
import request from '../../../../api';
import { userInfoState } from '../../../../atom/atom';
import { useRecoilValue } from 'recoil';

function AuthTaskModal({ task, setIsOpen }) {
  const userInfo = useRecoilValue(userInfoState);
  const [authData, setAuthData] = useState({
    image: '',
    content: '',
    taskId: task.taskId,
    memberId: userInfo.memberId,
  });

  console.log('부모', authData);

  const authHandler = () => {
    request.post(`/api/task-check`, authData).then((res) => {
      console.log(res);
    });
    console.log('먹힘');
  };

  //   const getAuthTask = () => {
  //     request(`/api/task-check/${task.taskCheckId}`);
  //   };

  const onClose = () => {
    setIsOpen(false);
    console.log('클릭됨');
  };

  return (
    <Modal
      onClose={onClose}
      style={{
        content: { width: 'auto', height: 'auto', borderRadius: '20px' },
      }}
    >
      <ModalContent
        text={`${task.content} 인증`}
        content={
          task.taskChecked ? null : (
            <AuthTask authData={authData} setAuthData={setAuthData} />
          )
        }
        firstBtnType={'small_blue'}
        secondBtnType={'small_grey'}
        firstBtnText={task.taskChecked ? null : '인증'}
        secondBtnText={'닫기'}
        setIsOpen={setIsOpen}
        onClick={task.taskChecked ? null : authHandler}
      />
    </Modal>
  );
}

export default AuthTaskModal;
