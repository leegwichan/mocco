import Button from '../../../Common/Button';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../atom/atom';
import request from '../../../../api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function InputProposal({ getProposalInfof }) {
  const [proposalContent, setProposalContent] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const { id } = useParams();

  const onChangeContent = (e) => {
    setProposalContent(e.target.value);
  };

  const proposalInfo = {
    content: proposalContent,
    memberId: userInfo.memberId,
    studyId: id,
  };

  const addProposalHandler = (e) => {
    e.preventDefault();
    setErrMessage('');

    if (proposalContent === '') {
      setErrMessage('내용을 입력해주세요');
      setIsValid(false);
    } else if (proposalContent.length >= 300) {
      setErrMessage('300자 미만으로 입력해주세요');
      setIsValid(false);
    } else {
      return request
        .post('/api/proposals', proposalInfo)
        .then(() => {
          setIsValid(true);
          setProposalContent('');
          getProposalInfof();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setProposalContent('');
          setErrMessage(err.response.data.message);
        });
    }
  };

  return (
    <div>
      <div css={container}>
        <input
          type="text"
          placeholder="신청을 위한 한 마디를 적어주세요"
          value={proposalContent}
          onChange={onChangeContent}
        />
        <Button
          type={'big_blue'}
          text={'등록'}
          onClick={addProposalHandler}
          disabled={!isValid}
        />
      </div>
      {errMessage && <div css={err}>{errMessage}</div>}
    </div>
  );
}

export default InputProposal;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 975px;
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }
`;

const err = css`
  color: red;
`;
