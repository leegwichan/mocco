import { useEffect, useState } from 'react';
import request from '../../../../api';
import InputProposal from './InputProposal';
import ProposalSection from './ProposalSection';
import { useParams } from 'react-router-dom';

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
    <div>
      <InputProposal />
      <ul>
        {proposals.map((proposal) => (
          <div key={proposal.proposalId}>
            <ProposalSection proposal={proposal} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ProposaTab;
