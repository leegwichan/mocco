package com.team_60.Mocco.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class Response {
    @Builder
    @Getter
    @AllArgsConstructor
    public static class Member{
        private long memberId;
        private String nickname;
        private String roles;
    }
}
