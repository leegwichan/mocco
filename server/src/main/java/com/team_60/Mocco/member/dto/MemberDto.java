package com.team_60.Mocco.member.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.study_member.dto.StudyMemberDto;
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
        private String nickname;
        private String introduction;
        private String location;
        private String githubRepository1;
        private String githubRepository2;
        private String githubRepository3;
        private String profileImage;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class PatchPassword{
        private long memberId;
        private String originalPassword;
        private String newPassword;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class PostEvaluation extends PostDto {
        private int evaluation;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class GithubInfo{
        private String authorizationCode;
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
        private String githubNickname;
        private String introduction;
        private String location;
        private List<String> githubRepositoryList;
        private List<StudyMemberDto.Response> progressStudy;
        private List<StudyMemberDto.Response> doneStudy;

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
