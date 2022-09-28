package com.team_60.Mocco.helper.aop;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
@Profile("!deploy")
public class AuthenticationServiceLocal implements AuthenticationService{

    public void AuthenticationCheckWithId(String parameterName, long id) { // patch, delete (id값 받는 경우)
    }

    public <T> void AuthenticationCheckWithDto(T requestBody) { //post
    }

    public void AuthenticationCheckStudyMember(long studyId) { //studyRoom
    }
}
