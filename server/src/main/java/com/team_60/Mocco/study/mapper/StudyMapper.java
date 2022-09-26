package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyMapper {

    static StudyDto.SubResponse studyToStudySubResponseDto(Study study){
        return new StudyDto.SubResponse(
                study.getStudyId(),
                study.getImage(), study.getTeamName(),
                study.getCapacity(), study.getSummary(),
                study.getStudyStatus()

        );
    }

    default Study studyRequestDtoToStudy (StudyDto.Request request, List<Task> taskList){
        Member member = new Member();
        member.setMemberId(request.getMemberId());

        Study study = Study.builder()
                .studyId(request.getStudyId())
                .teamLeader(member)
                .teamName(request.getTeamName())
                .capacity(request.getCapacity())
                .image(request.getImage())
                .summary(request.getSummary())
                .detail(request.getDetail())
                .rule(request.getRule())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .taskList(taskList)
                .build();
        if(taskList != null){
        taskList.stream().forEach(task -> task.setStudy(study));}
        return study;

    }
    @Mapping(source = "teamLeader", target = "member")
    StudyDto.Response studyToStudyResponseDto (Study study);

    List<StudyDto.SubResponse> studiesToStudySubResponseDtos (List<Study> studyList);
}
