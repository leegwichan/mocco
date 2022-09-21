package com.team_60.Mocco.study.service;

import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import org.springframework.data.domain.Page;

import javax.servlet.http.HttpServletRequest;

public interface StudyService {
    Study createStudy(Study study);
    Study createStubStudy(Study study);
    Study updateStudy(Study study, HttpServletRequest request);
    Study finishRecruitStudy(long studyId);
    void deleteStudy(long studyId);
    Study findStudy(long studyId);
    Page<Study> findStudies(int page, int size);
    Page<Study> searchStudies(String query, int page, int size);
    public StudyDto.CountResponse countStudies();
    Study findVerifiedStudy(long studyId);
}
