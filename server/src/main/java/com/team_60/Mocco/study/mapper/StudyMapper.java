package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;

public interface StudyMapper {

    static StudyDto.SubResponse studyToStudySubResponseDto(Study study){
        return new StudyDto.SubResponse(
                study.getImage(), study.getTeamName(),
                study.getCapacity(), study.getSummary()
        );
    }
}
