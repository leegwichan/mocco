package com.team_60.Mocco.study.service;

import com.team_60.Mocco.study.entity.Study;
import org.springframework.data.domain.Page;

public interface StudyService {

    Study createStudy(Study study);
    Study updateStudy(long studyId);
    void deleteStudy(long studyId);
    Study findStudy(long studyId);
    Page<Study> findStudies(int page, int size);
    Page<Study> searchStudies(String query, int page, int size);
    Study findVerifiedStudy(long studyId);

}
