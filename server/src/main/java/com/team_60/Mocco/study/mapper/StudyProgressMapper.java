package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.dto.StudyProgressDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task.dto.TaskDto;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StudyProgressMapper {


    default StudyProgressDto.Response studyToStudyProgressResponseDto(Study study, long memberId){
        TaskDto.MemberProgressResponse progress = studyToTaskMemberProgressResponseDto(study);

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

        return new StudyProgressDto.Response(progress, memberList, taskList);
    }

    private TaskDto.MemberProgressResponse studyToTaskMemberProgressResponseDto(Study study){
        Map<Member, Integer> taskCompleteCount = new HashMap<>();
        for (StudyMember studyMember : study.getStudyMemberList()){
            taskCompleteCount.put(studyMember.getMember(), 0);
        }

        study.getTaskList().stream().forEach(task -> task.getTaskCheckList().stream().forEach(
                taskCheck -> taskCompleteCount.put(taskCheck.getMember(), taskCompleteCount.get(taskCheck.getMember()) +1)
        ));

        List<TaskDto.MemberProgress> memberProgress = new ArrayList<>();
        for (Member member : taskCompleteCount.keySet()){
            memberProgress.add(new TaskDto.MemberProgress(member.getMemberId(), taskCompleteCount.get(member)));
        }

        return new TaskDto.MemberProgressResponse(study.getTaskList().size(), memberProgress);
    }

    StudyProgressDto.Rule studyToStudyProgressResponseRuleDto(Study study);
    Study studyProgressResponseRuleDtoToStudy(StudyProgressDto.Rule dto);
}
