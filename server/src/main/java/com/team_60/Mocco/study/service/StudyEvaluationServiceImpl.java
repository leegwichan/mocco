package com.team_60.Mocco.study.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.entity.MyInfo;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.study_member.repository.StudyMemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class StudyEvaluationServiceImpl implements StudyEvaluationService{

    private final StudyService studyService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final StudyMemberRepository studyMemberRepository;

    @Override
    @Transactional(readOnly = true)
    public Study getStudyByStudyEvaluation(long studyId) {

        Study findStudy = studyService.findVerifiedStudy(studyId);
        CheckIsEvaluationStatus(findStudy);

        return findStudy;
    }

    @Override
    public void evaluateStudyMembers(long studyId, long memberId, List<Member> members) {

        Study findStudy = studyService.findVerifiedStudy(studyId);
        Member findMember = memberService.findVerifiedMember(memberId);
        CheckIsEvaluationStatus(findStudy);
        CheckAlreadyEvaluate(findMember, findStudy);
        CheckAllEvaluate(findStudy, members, memberId);

        for (Member member: members){
            Member evaluatedMember = memberService.findMember(member.getMemberId());
            MyInfo evaluatedMemberMyInfo = evaluatedMember.getMyInfo();
            evaluatedMemberMyInfo.setEvaluationTotal(
                    evaluatedMemberMyInfo.getEvaluationTotal() + member.getMyInfo().getEvaluationTotal());
            evaluatedMemberMyInfo.setEvaluationNumber(
                    evaluatedMemberMyInfo.getEvaluationNumber() + 1);
            memberRepository.save(evaluatedMember);
        }

        StudyMember studyMember = studyMemberRepository.findByStudyAndMember(findStudy, findMember).get();
        studyMember.setEvaluationStatus(StudyMember.StudyMemberEvaluationStatus.COMPLETE);
        studyMemberRepository.save(studyMember);
    }

    private void CheckIsEvaluationStatus(Study study){
        if (study.getStudyStatus() != Study.StudyStatus.STUDY_COMPLETE){
            throw new BusinessLogicException(ExceptionCode.STUDY_NOT_COMPLETE);
        }
    }
    private void CheckAlreadyEvaluate(Member member, Study study){
        for (StudyMember studyMember : study.getStudyMemberList()){
            if (studyMember.getMember().getMemberId() == member.getMemberId()){
                if (studyMember.getEvaluationStatus() != StudyMember.StudyMemberEvaluationStatus.BEFORE_EVALUATION){
                    throw new BusinessLogicException(ExceptionCode.NOT_STUDY_EVALUATION_STATUS);
                }
                return;
            }
        }
        throw new BusinessLogicException(ExceptionCode.NOT_STUDY_MEMBER);
    }
    private void CheckAllEvaluate(Study study, List<Member> members, long evaluatorMemberId){

        if (study.getStudyMemberList().size() -1 != members.size()){
            throw new BusinessLogicException(ExceptionCode.NOT_ALL_EVALUATION);
        }

        ArrayList<Long> memberIdArray = new ArrayList<>();
        memberRepeat: for (Member member : members){
            for (long memberId : memberIdArray){
                if (memberId == member.getMemberId()) throw new BusinessLogicException(ExceptionCode.DUPLICATION_EVALUATION);
            }
            memberIdArray.add(member.getMemberId());

            if (evaluatorMemberId == member.getMemberId()) throw new BusinessLogicException(ExceptionCode.NOT_EVALUATION_MEMBER);
            for (StudyMember studyMember : study.getStudyMemberList()){
                if (studyMember.getMember().getMemberId() == member.getMemberId())
                    continue memberRepeat;
            }
            throw new BusinessLogicException(ExceptionCode.NOT_EVALUATION_MEMBER);
        }
    }
}
