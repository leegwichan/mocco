package com.team_60.Mocco.helper.aop;

public interface AuthenticationService {
    default void AuthenticationCheckWithId(String parameterName, long id) { // patch, delete (id값 받는 경우)
    }

    default <T> void AuthenticationCheckWithDto(T requestBody) { //post
    }

    default void AuthenticationCheckStudyMember(long studyId) { //studyRoom
    }
}
