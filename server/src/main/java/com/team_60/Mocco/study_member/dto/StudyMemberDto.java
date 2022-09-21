package com.team_60.Mocco.study_member.dto;

import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class StudyMemberDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private String image;
        private String teamName;
        private int capacity;
        private String summary;
        private Study.StudyStatus studyStatus;
        private StudyMember.StudyMemberEvaluationStatus evaluationStatus;
    }
}
