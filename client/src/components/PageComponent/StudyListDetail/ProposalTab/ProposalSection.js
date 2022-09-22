import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../atom/atom';

function ProposalSection({ proposal, getProposalInfof }) {
  const userInfo = useRecoilValue(userInfoState);

  const selectHandler = () => {
    return request
      .patch(`/api/proposals/approve/${proposal.proposalId}`)
      .then((res) => {
        console.log(res);
        getProposalInfof();
      })
      .catch((err) => console.log(err));
  };

  const refuseHandler = () => {
    return request
      .patch(`/api/proposals/denied/${proposal.proposalId}`)
      .then((res) => {
        console.log(res);
        getProposalInfof();
      })
      .catch((err) => console.log(err));
  };

  const deleteHander = () => {
    return request
      .delete(`/api/proposals/${proposal.proposalId}`)
      .then(() => {
        getProposalInfof();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div css={container}>
      <div>
        <span>사진</span>
        <span
          css={css`
            margin: 0px 12px;
          `}
        >
          {userInfo.nickname}
        </span>
      </div>
      <div
        css={css`
          margin-top: 16px;
        `}
      >
        {proposal.content}
      </div>
      <div css={button_container}>
        {' '}
        <Button
          type={'small_blue'}
          text={'수락'}
          onClick={() => selectHandler()}
        />
        <Button
          type={'small_white'}
          text={'거절'}
          onClick={() => refuseHandler()}
        />
        <Button
          type={'small_grey'}
          text={'취소'}
          onClick={() => deleteHander()}
        />
      </div>
    </div>
  );
}

export default ProposalSection;

const container = css`
  width: 1080px;
  margin-bottom: 25px;
  border-radius: 15px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  padding: 20px;
  font-size: 20px;
`;

const button_container = css`
  width: 1080px;
  margin-bottom: 25px;
  border-radius: 15px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  padding: 20px;
  font-size: 20px;
`;
