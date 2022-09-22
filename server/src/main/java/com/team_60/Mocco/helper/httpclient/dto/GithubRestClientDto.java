package com.team_60.Mocco.helper.httpclient.dto;

import com.google.gson.annotations.SerializedName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class GithubRestClientDto {

    @AllArgsConstructor
    @Getter
    public static class Request{
        private String client_id;
        private String client_secret;
        private String code;
    }

    @AllArgsConstructor
    @Getter
    public static class Response{
        private String access_token;
        private String refresh_token;
        private String token_type;
    }

    @AllArgsConstructor
    @Getter
    public static class UserInfo{

        @SerializedName("id")
        private String provider;

        @SerializedName("login")
        private String githubNickname;

        @Setter
        private String providerId;
    }
}
