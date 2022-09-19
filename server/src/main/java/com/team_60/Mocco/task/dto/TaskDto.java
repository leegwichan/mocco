package com.team_60.Mocco.task.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

public class TaskDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Request{
        private String content;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate deadline;
        private long studyId;
    }
}
