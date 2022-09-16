package com.team_60.Mocco.reply.dto;

import com.team_60.Mocco.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class ReplyDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long responseId;
        private String content;
        private String createdAt;
        private String modifiedAt;
        private MemberDto.SubResponse member;
    }
}
