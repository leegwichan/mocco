package com.team_60.Mocco.study_member.dto;

import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class StudyMemberDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long studyId;
        private String image;
        private String teamName;
        private int capacity;
        private String summary;
        private Study.StudyStatus studyStatus;
        private List<Long> membersId;
        private long teamLeaderId;
        private StudyMember.StudyMemberEvaluationStatus evaluationStatus;
    }
}
