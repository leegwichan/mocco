package com.team_60.Mocco.study.dto;

import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.task.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

public class StudyDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class SubResponse{
        private String image;
        private String teamName;
        private int capacity;
        private String summary;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Request{
        private String teamName;
        private int capacity;
        private String image;
        private String summary;
        private String detail;
        private String rule;
        private List<Task> taskList;
        private LocalDate startDate;
        private LocalDate endDate;
    }


    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private String teamName;
        private String summary;
        private String teamLeaderNickname;
        private List<Comment> commentList;
        private List<Reply> replyList;
    }
}
