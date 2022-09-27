package com.team_60.Mocco.task.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

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

    @AllArgsConstructor
    @Getter
    @Setter
    public static class MemberProgressResponse{
        private int totalTaskCount;
        private int expiredTaskCount;
        private List<MemberProgress> memberProgress;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class MemberProgress{
        private long memberId;
        private int endTaskCount;
    }
}

