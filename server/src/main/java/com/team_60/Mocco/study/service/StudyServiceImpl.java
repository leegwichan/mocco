package com.team_60.Mocco.study.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class StudyServiceImpl implements StudyService{

    private final StudyRepository studyRepository;

    @Override
    public Study findVerifiedStudy(long studyId) {
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        Study findStudy = optionalStudy.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        return findStudy;
    }
}
