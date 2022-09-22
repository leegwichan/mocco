package com.team_60.Mocco.member.mapper;

import com.team_60.Mocco.helper.httpclient.dto.GithubRestClientDto;
import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.entity.MyInfo;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyMapper;
import com.team_60.Mocco.study_member.dto.StudyMemberDto;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.study_member.mapper.StudyMemberMapper;
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
        member.setNickname(dto.getNickname());
        member.setMyInfo(memberPatchDtoToMyInfo(dto));

        return member;
    }

    MyInfo memberPatchDtoToMyInfo(MemberDto.Patch dto);

    Member githubRestClientUserInfoDtoToMember(GithubRestClientDto.UserInfo dto);

    default MemberDto.Response memberToMemberResponseDto(Member member){
        float evaluation = member.getMyInfo().getEvaluationNumber() == 0 ?
                0 : (float) member.getMyInfo().getEvaluationTotal() / (float) member.getMyInfo().getEvaluationNumber();

        List<String> github_repository_list = new ArrayList<>();
        github_repository_list.add(member.getMyInfo().getGithubRepository1());
        github_repository_list.add(member.getMyInfo().getGithubRepository2());
        github_repository_list.add(member.getMyInfo().getGithubRepository3());

        List<StudyMemberDto.Response> progressStudy = new ArrayList();
        List<StudyMemberDto.Response> doneStudy = new ArrayList();

        for (StudyMember studyMember : member.getStudyMemberList()){
            if (studyMember.getStudy().getStudyStatus() == Study.StudyStatus.STUDY_PROGRESS ||
                    (studyMember.getStudy().getStudyStatus() == Study.StudyStatus.STUDY_COMPLETE &&
                    studyMember.getEvaluationStatus() == StudyMember.StudyMemberEvaluationStatus.BEFORE_EVALUATION)){
                progressStudy.add(StudyMemberMapper.studyMemberToStudyMemberResponseDto(studyMember));
            } else if (studyMember.getEvaluationStatus() == StudyMember.StudyMemberEvaluationStatus.COMPLETE){
                doneStudy.add(StudyMemberMapper.studyMemberToStudyMemberResponseDto(studyMember));
            }
        }

        return new MemberDto.Response(
                member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getMyInfo().getProfileImage(),
                evaluation,
                member.getGithubNickname(),
                member.getMyInfo().getIntroduction(),
                member.getMyInfo().getLocation(),
                github_repository_list,
                progressStudy,
                doneStudy
        );
    }

    static MemberDto.SubResponse memberToMemberSubResponseDto(Member member){
        return new MemberDto.SubResponse(
                member.getMemberId(),
                member.getNickname(),
                member.getMyInfo().getProfileImage()
        );
    }

}
