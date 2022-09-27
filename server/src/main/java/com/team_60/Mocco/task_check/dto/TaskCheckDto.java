package com.team_60.Mocco.task_check.dto;

import com.team_60.Mocco.dto.PostDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

public class TaskCheckDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post extends PostDto {
        private String image;
        private String content;
        private long taskId;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long taskCheckId;
        private String image;
        private String content;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class SubResponse{
        private Long taskCheckId;
        private boolean isTaskChecked;
    }
}
