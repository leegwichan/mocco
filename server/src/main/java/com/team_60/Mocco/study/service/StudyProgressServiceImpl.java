package com.team_60.Mocco.study.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import com.team_60.Mocco.study_member.entity.StudyMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudyProgressServiceImpl implements StudyProgressService{

    private final StudyService studyService;
    private final StudyRepository studyRepository;

    @Override
    public Study findStudyWhenMemberMatched(long studyId, long memberId) {

        Study findStudy = studyService.findVerifiedStudy(studyId);
        checkStudyProgress(findStudy);

        boolean isStudyMember = false;
        for (StudyMember studyMember : findStudy.getStudyMemberList()){
            if (studyMember.getMember().getMemberId() == memberId) {
                isStudyMember = true; break;
            }
        }
        if (!isStudyMember) throw new BusinessLogicException(ExceptionCode.NOT_STUDY_MEMBER);

        return findStudy;
    }

    @Override
    public Study findStudy(long studyId) {
        Study findStudy = studyService.findVerifiedStudy(studyId);
        checkStudyProgress(findStudy);

        return findStudy;
    }

    @Override
    public Study patchStudyRule(Study study) {
        Study findStudy = studyService.findVerifiedStudy(study.getStudyId());
        checkStudyProgress(findStudy);

        Optional.ofNullable(study.getRule())
                .ifPresent(rule -> findStudy.setRule(rule));
        return studyRepository.save(findStudy);
    }

    private void checkStudyProgress(Study study){
        if (study.getStudyStatus() != Study.StudyStatus.STUDY_PROGRESS){
            throw new BusinessLogicException(ExceptionCode.STUDY_NOT_PROGRESS);
        }
    }
}
