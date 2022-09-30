package com.team_60.Mocco.member.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.study_member.dto.StudyMemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.List;

public class MemberDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        @Email(message = "이메일 형식을 지켜야 합니다.")
        @Size(max = 50, message = "이메일은 50자 이하이어야 합니다.")
        private String email;

        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=/`]).{8,20}$",
                message = "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상, 20자 이하이어야 합니다.")
        private String password;

        @Size(min = 2, max = 10, message = "닉네임은 최소 2글자 최대 10글자 이어야 합니다.")
        @Pattern(regexp = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$",
                message = "닉네임은 숫자, 영어, 한글만을 사용해야 합니다.")
        private String nickname;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Patch{
        @Size(min = 2, max = 10, message = "닉네임은 최소 2글자 최대 10글자 이어야 합니다.")
        @Pattern(regexp = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$",
                 message = "닉네임은 숫자, 영어, 한글만을 사용해야 합니다.")
        private String nickname;

        @Size(max = 500, message = "자기소개는 최대 500자 입니다.")
        private String introduction;

        @Size(max = 100, message = "위치는 최대 100자 입니다.")
        private String location;

        @Pattern(regexp = "^https://github.com/[a-zA-Z]*[/]\\S*$",
                 message = "깃허브 레포지포리 형식을 갖추어야 합니다.")
        private String githubRepository1;

        @Pattern(regexp = "^https://github.com/[a-zA-Z]*[/]\\S*$",
                message = "깃허브 레포지포리 형식을 갖추어야 합니다.")
        private String githubRepository2;

        @Pattern(regexp = "^https://github.com/[a-zA-Z]*[/]\\S*$",
                message = "깃허브 레포지포리 형식을 갖추어야 합니다.")
        private String githubRepository3;

        @Size(max = 200, message = "이미지 링크는 최대 200자 입니다.")
        private String profileImage;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class PatchPassword{

        private long memberId;
        private String originalPassword;

        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=/`]).{8,20}$",
                message = "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상, 20자 이하이어야 합니다.")
        private String newPassword;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class PostEvaluation extends PostDto {

        @Max(value = 5, message = "평가는 최대 5점을 줄 수 있습니다.")
        @Min(value = 1, message = "평가는 최소 1점을 줄 수 있습니다.")
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
