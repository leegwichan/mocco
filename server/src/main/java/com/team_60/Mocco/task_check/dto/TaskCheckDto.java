package com.team_60.Mocco.task_check.dto;

import com.team_60.Mocco.dto.PostDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDate;

public class TaskCheckDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post extends PostDto {

        @NotBlank(message = "Task 인증글에서 이미지는 필수 입력사항입니다.")
        @Size(max = 200, message = "이미지 링크는 최대 200자 입니다.")
        private String image;

        @NotBlank(message = "Task 인증글에서 내용는 필수 입력사항입니다.")
        @Size(max = 300, message = "인증글는 최대 300자 입니다.")
        private String content;

        @Positive(message = "Task 식별자는 양수만 들어갈 수 있습니다.")
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
