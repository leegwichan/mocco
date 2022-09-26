package com.team_60.Mocco.proposal.repository;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.study.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {
    List<Proposal> findByStudyAndProposalStatusOrderByCreatedAtAsc(Study study, Proposal.ProposalStatus status);
    Optional<Proposal> findByStudyAndMember(Study study, Member member);
}
