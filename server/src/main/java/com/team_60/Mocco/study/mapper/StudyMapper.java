package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.mapper.TaskMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
                .studyMemberList(new ArrayList<>())
                .build();
        if(taskList != null){
        taskList.stream().forEach(task -> task.setStudy(study));}
        return study;

    }
    @Mapping(source = "teamLeader", target = "member")
    @Mapping(target = "studyMemberList", expression = "java(studyMembersToMemberSubResponseDtos(study.getStudyMemberList()))")
    StudyDto.Response studyToStudyResponseDto (Study study);



    List<StudyDto.SubResponse> studiesToStudySubResponseDtos (List<Study> studyList);

    default List<MemberDto.SubResponse> studyMembersToMemberSubResponseDtos(List<StudyMember> studyMembers){
        return studyMembers.stream().map(m -> MemberMapper.memberToMemberSubResponseDto(m.getMember()))
                .collect(Collectors.toList());
    }
}
