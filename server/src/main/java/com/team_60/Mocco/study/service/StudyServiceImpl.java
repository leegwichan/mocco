package com.team_60.Mocco.study.service;

import com.team_60.Mocco.dto.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.dto.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.repository.MemberRepository;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import com.team_60.Mocco.study_member.serive.StudyMemberService;
import com.team_60.Mocco.task.service.TaskService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class StudyServiceImpl implements StudyService{

    private final StudyRepository studyRepository;
    private final MemberService memberService;
    private final StudyMemberService studyMemberService;
    private final TaskService taskService;


    @Override
    public Study createStudy(Study study) {
        if(study.getTaskList() == null) throw new BusinessLogicException(ExceptionCode.TASK_NOT_EXIST);
        Member member = memberService.findVerifiedMember(study.getTeamLeader().getMemberId());
        study.setStudyStatus(Study.StudyStatus.RECRUIT_PROGRESS);
        study.setTeamLeader(member);
        validateStudy(study);
        //스터디 생성
        Study createdStudy = studyRepository.save(study);

        //멤버에 스터디 아이디 추가
        member.getStudyLeaderList().add(createdStudy);
        studyMemberService.createStudyMember(createdStudy, member);
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
        if(study.getCapacity() != findStudy.getCapacity() && study.getCapacity() != 0) {
            findStudy.setCapacity(study.getCapacity());
        }
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
                        taskList.stream().forEach(n -> taskService.updateTask(n));
                        findStudy.getTaskList().clear();
                        findStudy.getTaskList().addAll(taskList);});
        validateStudy(findStudy);
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
                new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        return findStudy;
    }

    private void validateStudy(Study study){

        study.getTaskList().stream().forEach(n -> taskService.validateTask(n,study));
        if(study.getStartDate().compareTo(LocalDate.now())<0) {
            throw new BusinessLogicException(ExceptionCode.STARTDATE_PREVIOUS);
        }
        long studyDays = ChronoUnit.DAYS.between(study.getStartDate(), study.getEndDate());
        log.info(studyDays+" : 스터디 기간 범위");
        if(studyDays<7 || studyDays>180) {
            throw new BusinessLogicException(ExceptionCode.NOT_CORRECT_PERIOD);
        }

    }
}
