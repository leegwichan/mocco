package com.team_60.Mocco.study_member.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.study_member.dto.StudyMemberDto;
import com.team_60.Mocco.study_member.entity.StudyMember;
import java.util.List;
import java.util.stream.Collectors;

public interface StudyMemberMapper {

    static StudyMemberDto.Response studyMemberToStudyMemberResponseDto(StudyMember studyMember){
        List<Long> membersId = studyMember.getStudy().getStudyMemberList().stream()
                .map(studyMember1 -> studyMember1.getMember().getMemberId())
                .collect(Collectors.toList());
        long teamLeaderId = studyMember.getStudy().getTeamLeader().getMemberId();

        return new StudyMemberDto.Response( studyMember.getStudy().getStudyId(),
                studyMember.getStudy().getImage(), studyMember.getStudy().getTeamName(),
                studyMember.getStudy().getCapacity(), studyMember.getStudy().getSummary(),
                studyMember.getStudy().getStudyStatus(),membersId, teamLeaderId, studyMember.getEvaluationStatus()
        );
    }
}
