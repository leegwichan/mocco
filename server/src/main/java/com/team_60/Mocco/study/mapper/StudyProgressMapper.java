package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.study.dto.StudyProgressDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.dto.TaskDto;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StudyProgressMapper {


    default StudyProgressDto.Response studyToStudyProgressResponseDto(Study study, long memberId){

        List<MemberDto.SubResponse> memberList = study.getStudyMemberList().stream().map(studyMember ->
                new MemberDto.SubResponse(
                        studyMember.getMember().getMemberId(),
                        studyMember.getMember().getNickname(),
                        studyMember.getMember().getMyInfo().getProfileImage()))
                .collect(Collectors.toList());

        List<TaskDto.CheckResponse> taskList = study.getTaskList().stream()
                .map(task -> {
                    TaskCheck taskCheck = null;
                    for (TaskCheck t: task.getTaskCheckList()){
                        if (t.getMember().getMemberId() == memberId){
                            taskCheck = t; break;
                        }
                    }

                    TaskCheckDto.SubResponse taskCheckResponse = new TaskCheckDto.SubResponse(
                            taskCheck != null ? task.getTaskId() : null,
                            taskCheck != null
                    );

                    return new TaskDto.CheckResponse(
                            task.getTaskId(), task.getDeadline(),
                            task.getContent(), taskCheckResponse);
                }).collect(Collectors.toList());

        return new StudyProgressDto.Response(memberList, taskList);
    }

    StudyProgressDto.Rule studyToStudyProgressResponseRuleDto(Study study);
    Study studyProgressResponseRuleDtoToStudy(StudyProgressDto.Rule dto);
}
