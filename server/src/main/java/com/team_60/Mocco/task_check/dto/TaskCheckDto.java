package com.team_60.Mocco.task_check.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class TaskCheckDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        private String image;
        private String content;
        private long taskId;
        private long memberId;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long taskCheckId;
        private String image;
        private String content;
    }
}
