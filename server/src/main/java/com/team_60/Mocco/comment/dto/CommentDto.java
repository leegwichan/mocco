package com.team_60.Mocco.comment.dto;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.reply.dto.ReplyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class CommentDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        private String content;
        private long memberId;
        private long studyId;
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
        private long commentId;
        private String content;
        private String createdAt;
        private String modifiedAt;
        private MemberDto.SubResponse member;
        private List<ReplyDto.Response> replies;
    }

}
