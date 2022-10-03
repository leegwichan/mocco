import Button from '../../../Common/Button';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../atom/atom';
import request from '../../../../api';
import { useParams } from 'react-router-dom';
import { useInputValid } from '../hooks/useInputValid';

function InputProposal({ getProposalInfof }) {
  const { value, setIsValid, setValue, handleChange, handleClick } =
    useInputValid({
      initialvalues: '',
      onClick: () => {
        addProposalHandler();
      },
    });
  const userInfo = useRecoilValue(userInfoState);
  const { id } = useParams();

  const proposalInfo = {
    content: value,
    memberId: userInfo.memberId,
    studyId: id,
  };

  const addProposalHandler = () => {
    request
      .post('/api/proposals', proposalInfo)
      .then(() => {
        setIsValid(true);
        setValue('');
        getProposalInfof();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <div css={container}>
        <input
          type="text"
          placeholder="신청을 위한 한 마디를 적어주세요"
          value={value}
          onChange={handleChange}
        />
        <Button type={'big_blue'} text={'등록'} onClick={handleClick} />
      </div>
    </div>
  );
}

export default InputProposal;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  input {
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    padding: 0.5rem;
    flex-grow: 1;
  }
`;
