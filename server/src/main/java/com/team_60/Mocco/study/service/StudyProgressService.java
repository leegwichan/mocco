package com.team_60.Mocco.study.service;

import com.team_60.Mocco.study.entity.Study;

public interface StudyProgressService {
    Study findStudyWhenMemberMatched(long studyId, long memberId);
    Study findStudy(long studyId);
    Study patchStudyRule(Study study);
}
