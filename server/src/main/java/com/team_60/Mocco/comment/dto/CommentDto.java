package com.team_60.Mocco.comment.dto;

import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.reply.dto.ReplyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.util.List;

public class CommentDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post extends PostDto {

        @Size(max = 300, message = "댓글은 최대 300자입니다.")
        @NotBlank(message = "댓글은 공백이 아니어야 합니다.")
        private String content;

        @Positive(message = "study 식별자는 양수만 들어갈 수 있습니다.")
        private long studyId;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch{
        @Size(max = 300, message = "댓글은 최대 300자입니다.")
        @NotBlank(message = "댓글은 공백이 아니어야 합니다.")
        private String content;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long commentId;
        private String content;
        private String createdAt;
        private String modifiedAt;
        private Comment.CommentStatus commentStatus;
        private MemberDto.SubResponse member;
        private List<ReplyDto.Response> replyList;
    }

}
