package com.team_60.Mocco.task.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TaskDto {

    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;
    private long taskId;

    @AllArgsConstructor
    @Getter
    @Setter
    public static class CheckResponse{
        private long taskId;
        private LocalDate deadline;
        private String content;
        private TaskCheckDto.SubResponse taskCheck;
    }
}

