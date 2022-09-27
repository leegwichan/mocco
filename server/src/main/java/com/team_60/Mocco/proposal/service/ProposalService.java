package com.team_60.Mocco.proposal.service;

import com.team_60.Mocco.proposal.entity.Proposal;

import java.util.List;

public interface ProposalService {

    List<Proposal> findProposalsByStudyId(long studyId);
    Proposal createProposal(Proposal proposal);
    void deleteProposal(long proposalId);
    Proposal approveProposal(long proposalId);
    Proposal refuseProposal(long proposalId);
    public Proposal findVerifiedProposal(long proposalId);
}
