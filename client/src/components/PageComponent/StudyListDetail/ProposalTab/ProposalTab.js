import { useEffect, useState } from 'react';
import request from '../../../../api';
import InputProposal from './InputProposal';
import ProposalSection from './ProposalSection';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';

function ProposaTab() {
  const { id } = useParams();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    getProposalInfo();
  }, []);

  const getProposalInfo = () => {
    return request(`/api/proposals?study-id=${id}`).then((res) => {
      console.log('프로포셜', res.data.data);
      setProposals(res.data.data);
    });
  };
  console.log('프로포셜 state', proposals);
  return (
    <main css={container}>
      <InputProposal getProposalInfof={getProposalInfo} />
      <ul>
        {proposals.map((proposal) => (
          <div key={proposal.proposalId}>
            <ProposalSection
              proposal={proposal}
              getProposalInfof={getProposalInfo}
            />
          </div>
        ))}
      </ul>
    </main>
  );
}

export default ProposaTab;

const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;

  @media all and (max-width: 768px) {
    padding: 0px;
  }
`;
