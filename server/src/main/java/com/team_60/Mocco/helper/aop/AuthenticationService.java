package com.team_60.Mocco.helper.aop;

public interface AuthenticationService {
    void AuthenticationCheckWithId(String parameterName, long id);
    <T> void AuthenticationCheckWithDto(T requestBody);
    void AuthenticationCheckStudyMember(long studyId);
}
