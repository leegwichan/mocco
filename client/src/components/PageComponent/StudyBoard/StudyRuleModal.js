import Button from '../../Common/Button';
import Modal from '../../Common/Modal';
import ModalContent from '../../Common/ModalContent';
import { useState } from 'react';
import request from '../../../api';
import { css } from '@emotion/react';

function StudyRuleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editContent, setEditContent] = useState('');

  const getStudyRule = () => {
    setIsOpen(true);
    return request(`/api/study-progress/rule/357`).then((res) => {
      console.log(res);
      setContent(res.data.data.rule);
    });
  };

  const onChange = () => {
    setIsEditOpen(!isEditOpen);
  };

  const editHandler = () => {
    return request
      .patch(`/api/study-progress/rule/357`, { rule: editContent })
      .then((res) => {
        console.log('edit', res);
        setIsEditOpen(false);
        getStudyRule();
      });
  };

  return (
    <div>
      <Button type={'big_blue'} text={'규칙'} onClick={getStudyRule} />
      {isOpen && (
        <Modal
          style={{
            content: { width: 'auto', height: 'auto', borderRadius: '20px' },
          }}
        >
          <ModalContent
            text={'우리 스터디 규칙'}
            content={
              isEditOpen ? (
                <textarea
                  defaultValue={content}
                  css={editor}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                content
              )
            }
            firstBtnType={'small_blue'}
            secondBtnType={'small_grey'}
            firstBtnText={isEditOpen ? '완료' : '수정'}
            secondBtnText={'닫기'}
            setIsOpen={setIsOpen}
            onClick={isEditOpen ? editHandler : onChange}
          />
        </Modal>
      )}
    </div>
  );
}

export default StudyRuleModal;

const editor = css`
  display: block;
  border: 1px solid #d1d1d1;
  width: 100%;
  padding: 0.5rem;
  height: 100%;
  border-radius: 10px;
  resize: none;
`;
