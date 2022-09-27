package com.team_60.Mocco.proposal.service;

import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.proposal.repository.ProposalRepository;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.service.StudyService;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.study_member.serive.StudyMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProposalServiceImpl implements ProposalService{

    private final ProposalRepository proposalRepository;
    private final MemberService memberService;
    private final StudyService studyService;
    private final StudyMemberService studyMemberService;
    private final AlarmService alarmService;

    @Override
    public List<Proposal> findProposalsByStudyId(long studyId) {
        Study findStudy = studyService.findVerifiedStudy(studyId);

        return proposalRepository
                .findByStudyAndProposalStatusOrderByCreatedAtAsc(findStudy, Proposal.ProposalStatus.PROPOSAL_WAITING);
    }

    @Override
    public Proposal createProposal(Proposal proposal) {

        Member findMember = memberService.findVerifiedMember(proposal.getMember().getMemberId());
        Study findStudy = studyService.findVerifiedStudy(proposal.getStudy().getStudyId());
        checkProposalCondition(findMember, findStudy);

        proposal.setMember(findMember);
        proposal.setStudy(findStudy);
        return proposalRepository.save(proposal);
    }

    @Override
    public void deleteProposal(long proposalId) {

        Proposal proposal = findVerifiedProposal(proposalId);
        proposalRepository.delete(proposal);
    }

    @Override
    public Proposal approveProposal(long proposalId) {
        Proposal findProposal = findVerifiedProposal(proposalId);
        checkProposalStatus(findProposal);

        findProposal.setProposalStatus(Proposal.ProposalStatus.PROPOSAL_ACCEPT);
        studyMemberService.createStudyMember(findProposal.getStudy(), findProposal.getMember());
        alarmService.createAlarmWhenProposalApprove(findProposal.getStudy(), findProposal.getMember());

        // TODO 이거 왜 저장됨??
        return findProposal;
    }

    @Override
    public Proposal refuseProposal(long proposalId) {
        Proposal findProposal = findVerifiedProposal(proposalId);
        checkProposalStatus(findProposal);

        findProposal.setProposalStatus(Proposal.ProposalStatus.PROPOSAL_DENIED);
        return proposalRepository.save(findProposal);
    }

    private Proposal findVerifiedProposal(long proposalId){

        Optional<Proposal> optionalProposal = proposalRepository.findById(proposalId);
        Proposal findProposal = optionalProposal.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PROPOSAL_NOT_FOUND));
        return findProposal;
    }

    private void checkProposalCondition(Member member, Study study){
        if (study.getStudyStatus() != Study.StudyStatus.RECRUIT_PROGRESS){
            throw new BusinessLogicException(ExceptionCode.STUDY_NOT_RECRUIT);
        }

        for (StudyMember studyMember : study.getStudyMemberList()){
            if (studyMember.getMember().getMemberId() == member.getMemberId()){
                throw new BusinessLogicException(ExceptionCode.PROPOSAL_NOT_CREATED);
            }
        }

        proposalRepository.findByStudyAndMember(study, member)
                .ifPresent(m -> {
                    throw new BusinessLogicException(ExceptionCode.PROPOSAL_ALREADY_EXIST);
                        });
    }

    private void checkProposalStatus(Proposal proposal){
        if (proposal.getProposalStatus() != Proposal.ProposalStatus.PROPOSAL_WAITING){
            throw new BusinessLogicException(ExceptionCode.PROPOSAL_NOT_WAITING);
        }
    }
}
