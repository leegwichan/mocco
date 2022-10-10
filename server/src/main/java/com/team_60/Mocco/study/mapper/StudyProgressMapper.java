package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.study.dto.StudyProgressDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task.dto.TaskDto;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import org.mapstruct.Mapper;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface StudyProgressMapper {


    default StudyProgressDto.Response studyToStudyProgressResponseDto(Study study, long memberId){
        TaskDto.MemberProgressResponse progress = studyToTaskMemberProgressResponseDto(study);

        List<MemberDto.SubResponse> memberList =
                study.getStudyMemberList().stream().map(studyMember ->
                        MemberMapper.memberToMemberSubResponseDto(studyMember.getMember()))
                .collect(Collectors.toList());

        MemberDto.SubResponse teamLeader = MemberMapper.memberToMemberSubResponseDto(study.getTeamLeader());

        List<TaskDto.CheckResponse> taskList = studyToTaskCheckResponseDto(study, memberId);

        return new StudyProgressDto.Response(progress, memberList, teamLeader, taskList);
    }

    default StudyProgressDto.SubResponse studyToStudyProgressSubResponseDto(Study study, long memberId){
        List<TaskDto.CheckResponse> taskList = studyToTaskCheckResponseDto(study, memberId);
        return new StudyProgressDto.SubResponse(taskList);
    }

    private TaskDto.MemberProgressResponse studyToTaskMemberProgressResponseDto(Study study){
        Map<Member, Integer> taskCompleteCount = new HashMap<>();
        for (StudyMember studyMember : study.getStudyMemberList()){
            taskCompleteCount.put(studyMember.getMember(), 0);
        }

        study.getTaskList().stream().forEach(task -> task.getTaskCheckList().stream().forEach(
                taskCheck -> taskCompleteCount.put(taskCheck.getMember(), taskCompleteCount.get(taskCheck.getMember()) +1)
        ));

        int expiredTaskCount = (int) study.getTaskList().stream().filter(task ->
                task.getDeadline().isBefore(LocalDate.now(ZoneId.of("Asia/Seoul")))).count();

        List<TaskDto.MemberProgress> memberProgress = new ArrayList<>();
        for (Member member : taskCompleteCount.keySet()){
            memberProgress.add(new TaskDto.MemberProgress(member.getMemberId(), taskCompleteCount.get(member)));
        }

        return new TaskDto.MemberProgressResponse(study.getTaskList().size(), expiredTaskCount, memberProgress);
    }

    private List<TaskDto.CheckResponse> studyToTaskCheckResponseDto(Study study, long memberId){
        return study.getTaskList().stream()
                .map(task -> {
                    TaskCheck taskCheck = null;
                    for (TaskCheck t: task.getTaskCheckList()){
                        if (t.getMember().getMemberId() == memberId){
                            taskCheck = t; break;
                        }
                    }

                    TaskCheckDto.SubResponse taskCheckResponse = new TaskCheckDto.SubResponse(
                            taskCheck != null ? taskCheck.getTaskCheckId() : null,
                            taskCheck != null
                    );

                    return new TaskDto.CheckResponse(
                            task.getTaskId(), task.getDeadline(),
                            task.getContent(), taskCheckResponse);
                }).collect(Collectors.toList());
    }

    StudyProgressDto.PatchRule studyToStudyProgressResponseRuleDto(Study study);
    Study studyProgressResponseRuleDtoToStudy(StudyProgressDto.PatchRule dto);
}
