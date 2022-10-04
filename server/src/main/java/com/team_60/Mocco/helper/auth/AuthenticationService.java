package com.team_60.Mocco.helper.auth;

public interface AuthenticationService {
    void AuthenticationCheckWithId(String parameterName, long id, long memberId); // patch, delete (id값 받는 경우)


    <T> void setMemberIdOfRequestBody(T requestBody, long memberId); //post


    void AuthenticationCheckStudyMember(long studyId, long memberId); //studyRoom

    void AuthenticationCheckStudyLeader(long proposalId,long memberId);

}
