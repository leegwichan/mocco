package com.team_60.Mocco.study.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;
import java.util.OptionalInt;

import static com.team_60.Mocco.exception.businessLogic.ExceptionCode.NOT_SAME_USER;
import static com.team_60.Mocco.exception.businessLogic.ExceptionCode.STUDY_NOT_FOUND;
import static com.team_60.Mocco.security.filter.JwtConstants.ACCESS_TOKEN_HEADER;
import static com.team_60.Mocco.security.filter.JwtConstants.TOKEN_HEADER_PREFIX;

@Service
@AllArgsConstructor
@Slf4j
public class StudyServiceImpl implements StudyService{

    private final StudyRepository studyRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Study createStudy(Study study) {
        Member member = memberService.findVerifiedMember(study.getTeamLeader().getMemberId());
        study.setStudyStatus(Study.StudyStatus.RECRUIT_PROGRESS);
        study.setTeamLeader(member);
        //스터디 생성
        Study createdStudy = studyRepository.save(study);

        //멤버에 스터디 아이디 추가
        member.getStudyLeaderList().add(createdStudy);
        //memberRepository.save(member);
        return createdStudy;
    }
    @Override
    public Study updateStudy(Study study, HttpServletRequest request) {
        //아이디로 스터디 찾기
        //작성자와 패치 날린사람 동일인이지 확인
        //작성자가 스터디 가지고 있는지 확인..? 필요한가?
        Study findStudy = findVerifiedStudy(study.getStudyId());
//        String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
//        if(findStudy.getTeamLeader().getEmail() != jwtTokenProvider.getEmail(accessToken)){
//            throw new BusinessLogicException(NOT_SAME_USER);
//        }

        Optional.ofNullable(study.getTeamName())
                .ifPresent(teamName -> findStudy.setTeamName(teamName));
        if(!OptionalInt.empty().equals(study.getCapacity())) findStudy.setCapacity(study.getCapacity());
        Optional.ofNullable(study.getImage())
                .ifPresent(image -> findStudy.setImage(image));
        Optional.ofNullable(study.getSummary())
                .ifPresent(summary -> findStudy.setSummary(summary));
        Optional.ofNullable(study.getDetail())
                .ifPresent(detail -> findStudy.setDetail(detail));
        Optional.ofNullable(study.getRule())
                .ifPresent(rule -> findStudy.setRule(rule));
        Optional.ofNullable(study.getStartDate())
                .ifPresent(startDate -> findStudy.setStartDate(startDate));
        Optional.ofNullable(study.getEndDate())
                .ifPresent(endDate -> findStudy.setEndDate(endDate));
        Optional.ofNullable(study.getTaskList())
                .ifPresent(taskList -> {
                        findStudy.getTaskList().clear();
                        findStudy.getTaskList().addAll(taskList);});
        return studyRepository.save(findStudy);
    }
    @Override
    public void deleteStudy(long studyId) {
        studyRepository.delete(findVerifiedStudy(studyId));
    }

    @Override
    public Study findStudy(long studyId) {
        return findVerifiedStudy(studyId);
    }

    @Override
    public Page<Study> findStudies(int page, int size) {
        Pageable pageable = PageRequest.of(page,size,Sort.by("studyId").descending());
        return studyRepository.findByStudyStatus(Study.StudyStatus.RECRUIT_PROGRESS, pageable);
    }

    @Override
    public Page<Study> searchStudies(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("studyId").descending());
        return studyRepository.findBySummaryContaining(query, pageable);
    }

        //studyId에 맞는 스터디 반환
    @Override
    public Study findVerifiedStudy(long studyId) {
            Optional<Study> optionalStudy = studyRepository.findById(studyId);
            Study findStudy = optionalStudy.orElseThrow(() ->
                    new BusinessLogicException(STUDY_NOT_FOUND));
            return findStudy;
        }

    private void validateStudy(Study study){
        //스터디 유효성 검사?
        //taskList 가 null 인지 체크(null 불가) 15개 이하
        //인원이 2명 이상 5명 이하인지 확인
        //스터디 기간 최소 7일 최대 180일
    }
}
