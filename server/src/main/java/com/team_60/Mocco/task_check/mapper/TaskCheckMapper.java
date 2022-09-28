package com.team_60.Mocco.task_check.mapper;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskCheckMapper {
    default TaskCheck taskCheckPostDtoToTaskCheck(TaskCheckDto.Post dto){
        Member member = new Member();
        member.setMemberId(dto.getMemberId());
        Task task = new Task();
        task.setTaskId(dto.getTaskId());

        TaskCheck taskCheck = new TaskCheck();
        taskCheck.setMember(member);
        taskCheck.setTask(task);
        taskCheck.setContent(dto.getContent());
        taskCheck.setImage(dto.getImage());
        return taskCheck;
    }
    TaskCheckDto.Response taskCheckToTaskCheckResponseDto(TaskCheck taskCheck);
}
