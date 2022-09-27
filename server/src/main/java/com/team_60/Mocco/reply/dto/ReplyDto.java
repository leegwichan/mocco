package com.team_60.Mocco.reply.dto;

import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.reply.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ReplyDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post extends PostDto {
        private long commentId;
        private String content;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch{
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
