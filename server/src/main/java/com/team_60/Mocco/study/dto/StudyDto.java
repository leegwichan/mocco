package com.team_60.Mocco.study.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team_60.Mocco.comment.dto.CommentDto;
import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.dto.TaskDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

public class StudyDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @Builder
    @AllArgsConstructor
    public static class Request extends PostDto {

        @Max(value = 0, message = "Study 식별자는 양수이어야 합니다.")
        private long studyId;

        @Size(max = 30, message = "스터디 이름은 최대 30자입니다.")
        @NotBlank(message = "스터디 이름은 빈칸일 수 없습니다.")
        private String teamName;

        @Max(value = 5, message = "스터디원은 최대 5명입니다.")
        @Min(value = 2, message = "스터디원은 최소 2명입니다.")
        private int capacity;

        @Size(max = 200, message = "이미지 링크는 최대 200자 입니다.")
        private String image;

        @Size(max = 50, message = "스터디 요약글을 최대 50자 입니다.")
        @NotBlank(message = "스터디 요약글은 빈칸일 수 없습니다.")
        private String summary;

        @Size(max = 5000, message = "스터디 상세 내용은 최대 5000자 입니다.")
        @NotBlank(message = "스터디 상세 내용은 빈칸일 수 없습니다.")
        private String detail;

        @Size(max = 2000, message = "스터디 규칙은 최대 2000자 입니다.")
        @NotBlank(message = "스터디 규칙은 빈칸일 수 없습니다.")
        private String rule;

        private List<TaskDto> taskList;

        @Future(message = "시작 날짜는 오늘 날짜보다 이후이어야 합니다.")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate startDate;

        @Future(message = "종료 날짜는 오늘 날짜보다 이후이어야 합니다.")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate endDate;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class SubResponse{
        private long studyId;
        private String image;
        private String teamName;
        private int capacity;
        private String summary;
        private Study.StudyStatus studyStatus;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class Response{
        private long studyId;
        private String teamName;
        private String summary;
        private String detail;
        private String rule;
        private int capacity;
        private String image;
        private LocalDate startDate;
        private LocalDate endDate;
        private MemberDto.SubResponse member;
        private List<MemberDto.SubResponse> studyMemberList;
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
