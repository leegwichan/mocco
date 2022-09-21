package com.team_60.Mocco.study.service;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;

import java.util.List;

public interface StudyEvaluationService {

    Study getStudyByStudyEvaluation(long studyId);
    void evaluateStudyMembers(long studyId, long memberId, List<Member> members);

}
