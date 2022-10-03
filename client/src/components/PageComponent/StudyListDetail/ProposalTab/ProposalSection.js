import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { singleStudyState, userInfoState } from '../../../../atom/atom';

function ProposalSection({ proposal, getProposalInfof }) {
  const studyInfo = useRecoilValue(singleStudyState);
  const userInfo = useRecoilValue(userInfoState);

  const selectHandler = () => {
    return request
      .patch(`/api/proposals/approve/${proposal.proposalId}`)
      .then(() => {
        // console.log(res);
        getProposalInfof();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    // }
  };

  const refuseHandler = () => {
    return request
      .patch(`/api/proposals/denied/${proposal.proposalId}`)
      .then(() => {
        getProposalInfof();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const deleteHander = () => {
    return request
      .delete(`/api/proposals/${proposal.proposalId}`)
      .then(() => {
        getProposalInfof();
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div css={container}>
      <Link
        to={`/main/${proposal.member.memberId}`}
        css={css`
          text-decoration: none;
        `}
      >
        <div css={profile}>
          <img
            src={proposal.member.profileImage}
            alt="프로필 이미지"
            css={image}
          />
          <span className="main_link">{proposal.member.nickname}</span>
        </div>
      </Link>
      <div
        css={css`
          margin-top: 16px;
        `}
      >
        {proposal.content}
      </div>
      <div css={buttonContainer}>
        <span className="day">{proposal.createdAt}</span>
        {studyInfo.member.memberId !== proposal.member.memberId && (
          <>
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
          </>
        )}
        {userInfo.memberId === proposal.member.memberId && (
          <Button type={'small_grey'} text={'취소'} onClick={deleteHander} />
        )}
      </div>
    </div>
  );
}

export default ProposalSection;

const container = css`
  width: 100%;
  margin-bottom: 25px;
  margin-top: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 3px rgb(0 0 0 / 10%);
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

  .day {
    margin-top: 13px;
    margin-right: 10px;
    font-size: 15px;
    color: #999999;

    @media all and (max-width: 768px) {
      font-size: 12px;
    }
  }

  @media all and (max-width: 768px) {
    font-size: 15px;
    padding: 10px 20px;
  }
`;

const buttonContainer = css`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const profile = css`
  display: flex;
  align-items: center;

  .main_link {
    color: black;
    margin: 12px;
    &:hover {
      cursor: pointer;
      color: #066ff2;
    }
  }
`;

const image = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
