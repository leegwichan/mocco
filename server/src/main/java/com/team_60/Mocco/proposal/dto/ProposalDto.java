package com.team_60.Mocco.proposal.dto;

import com.team_60.Mocco.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ProposalDto {

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long proposalId;
        private String content;
        private String createdAt;
        private MemberDto.SubResponse member;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        private long memberId;
        private long studyId;
        private String content;
    }

}
