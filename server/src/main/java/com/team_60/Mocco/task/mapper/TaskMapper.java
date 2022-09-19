package com.team_60.Mocco.task.mapper;

import com.team_60.Mocco.task.dto.TaskDto;
import com.team_60.Mocco.task.entity.Task;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    Task taskRequestDtoToTask (TaskDto request);
    List<Task> taskRequestDtoListToTaskList(List<TaskDto> requestList);

}
