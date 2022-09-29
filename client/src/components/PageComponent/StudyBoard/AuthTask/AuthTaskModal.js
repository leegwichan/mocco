import { useState, useEffect } from 'react';
import Modal from '../../../Common/Modal';
import ModalContent from '../../../Common/ModalContent';
import { css } from '@emotion/react';
import AuthTask from './AuthTask';
import request from '../../../../api';
// import { userInfoState } from '../../../../atom/atom';
// import { useRecoilValue } from 'recoil';

function AuthTaskModal({ task, setIsOpen }) {
  // const userInfo = useRecoilValue(userInfoState);
  const [authData, setAuthData] = useState({
    image: '',
    content: '',
    taskId: task.taskId,
    memberId: 3,
  });
  const [authContent, setAuthContent] = useState({});

  const authHandler = () => {
    if (authData.image === '') {
      alert('인증 이미지를 삽입해주세요');
    } else {
      request.post(`/api/task-check`, authData).then((res) => {
        console.log(res.data);
      });
    }
  };

  const getAuthTask = () => {
    request(`/api/task-check/${task.taskCheck.taskCheckId}`).then((res) => {
      console.log('먹힘', res);
      setAuthContent(res.data.data);
    });
  };
  // console.log(authContent);
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
                <img src={authContent.image} alt="auth_image" css={authImage} />
                <div>{authContent.content}</div>
              </div>
            ) : (
              <AuthTask authData={authData} setAuthData={setAuthData} />
            )
          }
          firstBtnType={'small_blue'}
          secondBtnType={'small_grey'}
          firstBtnText={task.taskCheck.taskCheckId ? '완료' : '인증'}
          secondBtnText={'닫기'}
          setIsOpen={setIsOpen}
          onClick={task.taskCheck.taskCheckId ? null : authHandler}
        />
      </Modal>
    </div>
  );
}

export default AuthTaskModal;

const authImage = css`
  height: 280px;
  margin-bottom: 10px;
`;

// ) : (
//   <div>
//     {task.taskCheck.taskCheckId && (
//       <Modal>
//         <ModalContent
//           text={`${task.content} 인증`}
//           content={
//             <div>
//               <img
//                 src={authContent.image}
//                 alt="auth_image"
//                 css={authImage}
//               />
//               <div>{authContent.content}</div>
//             </div>
//           }
//           firstBtnType={'small_blue'}
//           firstBtnText={'완료'}
//           secondBtnType={'small_grey'}
//           secondBtnText={'닫기'}
//           setIsOpen={setIsOpen}
//         />
//       </Modal>
//     )}
//   </div>
// )}
