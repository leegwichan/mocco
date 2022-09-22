import Button from '../../../Common/Button';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../atom/atom';
import request from '../../../../api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function InputProposal() {
  const [proposalContent, setProposalContent] = useState('');
  const userInfo = useRecoilValue(userInfoState);
  const { id } = useParams();

  const proposalInfo = {
    content: proposalContent,
    memberId: userInfo.memberId,
    studyId: id,
  };

  const addProposalHandler = (e) => {
    e.preventDefault();
    return request
      .post('/api/proposals', proposalInfo)
      .then(() => {
        setProposalContent('');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;

        input {
          width: 900px;
          height: 40px;
          border: 1px solid #d1d1d1;
          border-radius: 5px;
        }
      `}
    >
      <input
        type="text"
        placeholder="신청을 위한 한 마디를 적어주세요"
        value={proposalContent}
        onChange={(e) => setProposalContent(e.target.value)}
      />
      <Button type={'big_blue'} text={'등록'} onClick={addProposalHandler} />
    </div>
  );
}

export default InputProposal;
