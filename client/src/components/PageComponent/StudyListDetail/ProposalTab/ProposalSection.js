import { useState } from 'react';
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { Link } from 'react-router-dom';

function ProposalSection({ proposal, getProposalInfof }) {
  const [errMessage, setErrMessage] = useState('');

  const selectHandler = () => {
    return request
      .patch(`/api/proposals/approve/${proposal.proposalId}`)
      .then((res) => {
        console.log(res);
        getProposalInfof();
      })
      .catch((err) => {
        setErrMessage(err.response.data.message);
      });
  };

  const refuseHandler = () => {
    return request
      .patch(`/api/proposals/denied/${proposal.proposalId}`)
      .then(() => {
        getProposalInfof();
      })
      .catch((err) => {
        setErrMessage(err.response.data.message);
      });
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
    <div>
      {errMessage && (
        <div
          css={css`
            color: red;
          `}
        >
          {errMessage}
        </div>
      )}
      <div css={container}>
        <div>
          <Link
            to={`/main/${proposal.member.nickname}`}
            css={css`
              text-decoration: none;
            `}
          >
            <span className="main_link">사진</span>
          </Link>
          <Link
            to={`/main/${proposal.member.nickname}`}
            css={css`
              text-decoration: none;
            `}
          >
            <span
              className="main_link"
              css={css`
                margin: 0px 12px;
              `}
            >
              {proposal.member.nickname}
            </span>
          </Link>
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
    </div>
  );
}

export default ProposalSection;

const container = css`
  width: 1080px;
  margin-bottom: 25px;
  margin-top: 30px;
  border-radius: 15px;
  box-shadow: 2px 8px 2px -2px rgba(0, 0, 0, 0.25);
  padding: 20px;
  font-size: 20px;
  word-break: break-all;

  .main_link {
    color: black;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }
`;

const button_container = css`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;
