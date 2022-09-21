package com.team_60.Mocco.exception.oauth;

import lombok.Getter;
import lombok.Setter;

public class OAuthLogicException extends RuntimeException{

    @Setter
    @Getter
    private long oauthId;

    public OAuthLogicException(String message, long oauthId) {
        super(message);
        this.oauthId = oauthId;
    }
}
