package com.team_60.Mocco.study_member.mapper;

import com.team_60.Mocco.study_member.dto.StudyMemberDto;
import com.team_60.Mocco.study_member.entity.StudyMember;

public interface StudyMemberMapper {

    static StudyMemberDto.Response studyMemberToStudyMemberResponseDto(StudyMember studyMember){
        return new StudyMemberDto.Response(
                studyMember.getStudy().getImage(), studyMember.getStudy().getTeamName(),
                studyMember.getStudy().getCapacity(), studyMember.getStudy().getSummary(),
                studyMember.getStudy().getStudyStatus(), studyMember.getEvaluationStatus()
        );
    }
}
