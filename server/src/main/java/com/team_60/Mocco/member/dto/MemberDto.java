package com.team_60.Mocco.member.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team_60.Mocco.study.dto.StudyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class MemberDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        private String email;
        private String password;
        private String nickname;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Patch{
        private String password;
        private String nickname;
        private String introduction;
        private String location;
        private String githubRepository1;
        private String githubRepository2;
        private String githubRepository3;
        private String profileImage;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long memberId;
        private String email;
        private String nickname;
        private String profileImage;
        private float evaluation;
        private String githubId;
        private String introduction;
        private String location;
        private List<String> githubRepositoryList;
        private List<StudyDto.SubResponse> progressStudy;
        private List<StudyDto.SubResponse> doneStudy;

    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class SubResponse{
        private long memberId;
        private String nickname;
        private String profileImage;
    }
}
