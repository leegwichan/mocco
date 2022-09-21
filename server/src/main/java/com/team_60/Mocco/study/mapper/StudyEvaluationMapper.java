package com.team_60.Mocco.study.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.mapper.MemberMapper;
import com.team_60.Mocco.study.dto.StudyEvaluationDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StudyEvaluationMapper {

    default List<Member> StudyEvaluationPostDtoToMemberList(StudyEvaluationDto.Post dto){

        List<Member> members = new ArrayList<>();
        for(MemberDto.PostEvaluation memberDto : dto.getEvaluations()){
            Member member = new Member();
            member.setMemberId(memberDto.getMemberId());
            member.getMyInfo().setEvaluationTotal(memberDto.getEvaluation());
            members.add(member);
        }
        return members;
    }

    default StudyEvaluationDto.Response studyToStudyEvaluationResponseDto(Study study, long memberId){

        List<MemberDto.SubResponse> memberDtoList = new ArrayList<>();
        for(StudyMember studyMember : study.getStudyMemberList()){
            if (studyMember.getMember().getMemberId() == memberId) continue;
            memberDtoList.add(MemberMapper.memberToMemberSubResponseDto(studyMember.getMember()));
        }

        return new StudyEvaluationDto.Response(
                study.getStudyId(), study.getTeamName(),
                study.getEndDate(), memberDtoList
        );
    }
}
