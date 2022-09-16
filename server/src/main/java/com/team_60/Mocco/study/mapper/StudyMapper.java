package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudyMapper {

    static StudyDto.SubResponse studyToStudySubResponseDto(Study study){
        return new StudyDto.SubResponse(
                study.getImage(), study.getTeamName(),
                study.getCapacity(), study.getSummary()
        );
    }

    Study studyRequestDtoToStudy (StudyDto.Request request);
    StudyDto.Response studyToStudyResponseDto (Study study);
}
