import React from 'react'; // eslint-disable-line no-unused-vars
import { css } from '@emotion/react';
import Button from '../../../Common/Button';
import request from '../../../../api';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { singleStudyState, userInfoState } from '../../../../atom/atom';

function ProposalSection({ proposal, getProposalInfof }) {
  const studyInfo = useRecoilValue(singleStudyState);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  const selectHandler = () => {
    return request
      .patch(`/api/proposals/${proposal.proposalId}/approve`)
      .then(() => {
        // console.log(res);
        getProposalInfof();
      })
      .then(() => {
        request(`/api/study-info/board/${studyInfo.studyId}`).then((res) => {
          // console.log('둘째', res);
          if (studyInfo.capacity === res.data.data.studyMemberList.length) {
            request
              .patch(`/api/study-board/${studyInfo.studyId}/finish-recruit`)
              .then(() => alert('스터디 모집이 마감되었습니다'))
              .then(() => navigate(`/studylist`))
              .catch((err) => console.log(err));
          }
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const refuseHandler = () => {
    return request
      .patch(`/api/proposals/${proposal.proposalId}/denied`)
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
      <div
        css={profile}
        role="presentation"
        onClick={() =>
          userInfo !== null && navigate(`/main/${proposal.member.memberId}`)
        }
      >
        <img
          src={proposal.member.profileImage}
          alt="프로필 이미지"
          css={image}
        />
        <span className="main_link">{proposal.member.nickname}</span>
      </div>
      <div
        css={css`
          margin-top: 16px;
          white-space: pre-wrap;
          word-wrap: break-word;
        `}
      >
        {proposal.content}
      </div>
      <div className="btn">
        <span className="day">{proposal.createdAt}</span>
        {userInfo !== null && studyInfo.member.memberId === userInfo.memberId && (
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
        {userInfo !== null &&
          userInfo.memberId === proposal.member.memberId && (
            <Button type={'small_grey'} text={'취소'} onClick={deleteHander} />
          )}
      </div>
    </div>
  );
}

export default ProposalSection;

const container = css`
  width: 100%;
  margin-bottom: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 7px 3px rgb(0 0 0 / 10%);
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

  .btn {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;

    @media all and (max-width: 768px) {
      button {
        font-size: 15px;
        height: 35px;
        width: 48px;
        margin-left: 7px;
        padding-top: 4px;
      }
    }

    @media all and (max-width: 420px) {
      button {
        font-size: 13px;
        height: 32px;
        width: 40px;
        margin-left: 7px;
        padding-top: 0px;
      }
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

    @media all and (max-width: 420px) {
      font-size: 10px;
    }
  }

  @media all and (max-width: 768px) {
    font-size: 15px;
    padding: 10px 20px;
  }
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
