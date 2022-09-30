package com.team_60.Mocco.reply.dto;

import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.reply.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class ReplyDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post extends PostDto {

        @Positive(message = "댓글 식별자는 1 이상이어야 합니다.")
        private long commentId;

        @Size(max = 300, message = "대댓글은 최대 300자입니다.")
        @NotBlank(message = "대댓글은 공백이 아니어야 합니다.")
        private String content;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch{
        @Size(max = 300, message = "대댓글은 최대 300자입니다.")
        @NotBlank(message = "대댓글은 공백이 아니어야 합니다.")
        private String content;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long replyId;
        private String content;
        private String createdAt;
        private String modifiedAt;
        private Reply.ReplyStatus replyStatus;
        private MemberDto.SubResponse member;
    }
}
