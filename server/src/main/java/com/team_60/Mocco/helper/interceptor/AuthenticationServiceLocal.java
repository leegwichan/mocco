package com.team_60.Mocco.helper.interceptor;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("deploy")
public class AuthenticationServiceLocal implements AuthenticationService{

    @Override
    public void AuthenticationCheckWithId(String parameterName, long id, long memberId) {

    }

    @Override
    public <T> void setMemberIdOfRequestBody(T requestBody, long memberId) {

    }

    @Override
    public void AuthenticationCheckStudyMember(long studyId, long memberId) {

    }
}
