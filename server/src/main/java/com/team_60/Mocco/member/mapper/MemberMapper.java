package com.team_60.Mocco.member.mapper;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.entity.MyInfo;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyMapper;
import com.team_60.Mocco.study_member.entity.StudyMember;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    default Member memberPostDtoToMember(MemberDto.Post dto){
        Member member = new Member();
        member.setEmail(dto.getEmail());
        member.setPassword(dto.getPassword());
        member.setNickname(dto.getNickname());
        member.getMyInfo().setMember(member);
        return member;
    };

    default Member memberPatchDtoToMember(MemberDto.Patch dto){
        Member member = new Member();
        member.setPassword(dto.getPassword());
        member.setNickname(dto.getNickname());
        member.setMyInfo(memberPatchDtoToMyInfo(dto));

        return member;
    }

    MyInfo memberPatchDtoToMyInfo(MemberDto.Patch dto);

    default MemberDto.Response memberToMemberResponseDto(Member member){
        int evaluation = member.getMyInfo().getEvaluationNumber() == 0 ?
                0 : member.getMyInfo().getEvaluationTotal() / member.getMyInfo().getEvaluationNumber();

        List<String> github_repository_list = new ArrayList<>();
        github_repository_list.add(member.getMyInfo().getGithubRepository1());
        github_repository_list.add(member.getMyInfo().getGithubRepository2());
        github_repository_list.add(member.getMyInfo().getGithubRepository3());

        List<StudyDto.SubResponse> progressStudy = new ArrayList();
        List<StudyDto.SubResponse> doneStudy = new ArrayList();

        for (StudyMember studyMember : member.getStudyMemberList()){
            if (studyMember.getStudy().getStudyStatus() == Study.StudyStatus.STUDY_PROGRESS){
                progressStudy.add(StudyMapper.studyToStudySubResponseDto(studyMember.getStudy()));
            } else if (studyMember.getStudy().getStudyStatus() == Study.StudyStatus.STUDY_PROGRESS){
                doneStudy.add(StudyMapper.studyToStudySubResponseDto(studyMember.getStudy()));
            }
        }

        return new MemberDto.Response(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getMyInfo().getProfileImage(),
                evaluation,
                null,
                member.getMyInfo().getIntroduction(),
                member.getMyInfo().getLocation(),
                github_repository_list,
                progressStudy,
                doneStudy
        );
    }

}
