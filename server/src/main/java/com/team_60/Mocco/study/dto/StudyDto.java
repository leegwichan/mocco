package com.team_60.Mocco.study.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team_60.Mocco.comment.dto.CommentDto;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.reply.dto.ReplyDto;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.task.dto.TaskDto;
import com.team_60.Mocco.task.entity.Task;
import lombok.*;

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
    @Builder
    @AllArgsConstructor
    public static class Request{
        private long memberId;
        private long studyId;
        private String teamName;
        private int capacity;
        private String image;
        private String summary;
        private String detail;
        private String rule;
        private List<TaskDto.Request> taskList;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate startDate;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate endDate;
    }


    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private String summary;
        private String detail;
        private String teamLeaderNickname;
        private List<CommentDto.Response> commentList;
        private List<ReplyDto.Response> replyList;
    }
}
