import Button from '../../../Common/Button';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../atom/atom';
import request from '../../../../api';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { id } = useParams();

  const proposalInfo = {
    content: value,
    memberId: userInfo && userInfo.memberId,
    studyId: id,
  };

  const addProposalHandler = () => {
    if (userInfo === null) {
      navigate('/login', { state: { from: `/studylist/detail/${id}` } });
    } else {
      request
        .post('/api/proposals', proposalInfo)
        .then(() => {
          setIsValid(true);
          setValue('');
          getProposalInfof();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <section css={container}>
      <input
        type="text"
        placeholder="신청을 위한 한 마디를 적어주세요"
        value={value}
        onChange={handleChange}
      />
      <div className="btn_container">
        <Button type={'big_blue'} text={'등록'} onClick={handleClick} />
      </div>
    </section>
  );
}

export default InputProposal;

const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;

  input {
    height: 40px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    padding: 0.5rem;
    flex-grow: 1;

    @media all and (max-width: 420px) {
      font-size: 12px;
    }
  }

  .btn_container {
    @media all and (max-width: 768px) {
      button {
        font-size: 15px;
        padding: 0 15px;
      }
    }

    @media all and (max-width: 420px) {
      button {
        font-size: 13px;
        padding: 0 6px;
      }
    }
  }
`;
