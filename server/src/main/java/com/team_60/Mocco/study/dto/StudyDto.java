package com.team_60.Mocco.study.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team_60.Mocco.comment.dto.CommentDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.task.dto.TaskDto;
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
        private List<TaskDto> taskList;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate startDate;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate endDate;
    }


    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private long studyId;
        private String teamName;
        private String summary;
        private String detail;
        private String rule;
        private int capacity;
        private LocalDate startDate;
        private LocalDate endDate;
        private MemberDto.SubResponse member;
        private List<TaskDto> taskList;
        private List<CommentDto.Response> commentList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CountResponse{
        private long recruitStudy;
        private long progressStudy;
    }
}
