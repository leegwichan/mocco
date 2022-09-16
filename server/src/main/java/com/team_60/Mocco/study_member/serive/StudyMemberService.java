package com.team_60.Mocco.study_member.serive;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;

public interface StudyMemberService {

    StudyMember createStudyMember(Study study, Member member);
}
