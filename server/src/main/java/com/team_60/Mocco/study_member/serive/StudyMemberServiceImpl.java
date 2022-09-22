package com.team_60.Mocco.study_member.serive;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.study_member.repository.StudyMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyMemberServiceImpl implements StudyMemberService{

    private final StudyMemberRepository studyMemberRepository;

    @Override
    public StudyMember createStudyMember(Study study, Member member) {
        checkStudyMemberCondition(study, member);

        StudyMember studyMember = new StudyMember();
        studyMember.setStudy(study);
        studyMember.setMember(member);

        return studyMemberRepository.save(studyMember);
    }

    private void checkStudyMemberCondition(Study study, Member member){
        if (study.getCapacity() <= studyMemberRepository.countByStudy(study)){
            throw new BusinessLogicException(ExceptionCode.STUDY_MEMBER_OVER_CAPACITY);
        }
        studyMemberRepository.findByStudyAndMember(study, member)
                .ifPresent(m ->{
                    throw new BusinessLogicException(ExceptionCode.STUDY_MEMBER_ALREADY_INVITED);
                });
    }
}
