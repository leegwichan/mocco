package com.team_60.Mocco.study.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.study.dto.StudyDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import com.team_60.Mocco.study_member.serive.StudyMemberService;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.service.TaskService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class StudyServiceImpl implements StudyService{

    private final StudyRepository studyRepository;
    private final MemberService memberService;
    private final StudyMemberService studyMemberService;
    private final TaskService taskService;
    @Value("${image.default.study}")
    private List<String> studyImageList;


    @Override
    public Study createStudy(Study study) {
        if(study.getTaskList() == null) throw new BusinessLogicException(ExceptionCode.TASK_NOT_EXIST);
        Member member = memberService.findVerifiedMember(study.getTeamLeader().getMemberId());

        study.setStudyStatus(Study.StudyStatus.RECRUIT_PROGRESS);
        study.setTeamLeader(member);
        if (study.getImage() == null){
            String defaultImage = studyImageList.get((int) Math.floor(Math.random() * studyImageList.size()));
            study.setImage(defaultImage);
        }
        validateStudy(study);

        //스터디 생성
        Study createdStudy = studyRepository.save(study);

        //멤버에 스터디 아이디 추가
        member.getStudyLeaderList().add(createdStudy);
        studyMemberService.createStudyMember(createdStudy, member);
        return createdStudy;
    }
    @Override
    public Study createStubStudy(Study study) {
        study.setStudyStatus(Study.StudyStatus.RECRUIT_PROGRESS);
        study.setTeamLeader(memberService.findVerifiedMember(1));
        //스터디 생성
        return studyRepository.save(study);

    }

    @Transactional
    @Override
    public Study updateStudy(Study study) {
        Study findStudy = findVerifiedStudy(study.getStudyId());
//        String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
//        if(findStudy.getTeamLeader().getEmail() != jwtTokenProvider.getEmail(accessToken)){
//            throw new BusinessLogicException(NOT_SAME_USER);
//        }
        if (findStudy.getStudyStatus() != Study.StudyStatus.RECRUIT_PROGRESS){
            throw new BusinessLogicException(ExceptionCode.STUDY_NOT_RECRUIT);
        }

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
        // TODO 기존 정보와 일치할 떄, 업데이트 안하게 해야 한다?
        Optional.ofNullable(study.getTaskList())
                .ifPresent(taskList ->{
                    taskList.stream().forEach(task -> task.setStudy(findStudy));
                    updateTask(findStudy.getTaskList(), taskList);
                        });

        validateStudy(findStudy);
        return studyRepository.save(findStudy);
    }

    @Override
    public Study finishRecruitStudy(long studyId) {
        Study findStudy = findVerifiedStudy(studyId);
        if (findStudy.getStudyMemberList().size() <= 1){
            throw new BusinessLogicException(ExceptionCode.NOT_MEMBER_ABOVE_2);
        }

        findStudy.setStudyStatus(Study.StudyStatus.RECRUIT_COMPLETE);
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
    @Override
    public StudyDto.CountResponse countStudies(){
        return new StudyDto.CountResponse(
                studyRepository.countByStudyStatus(Study.StudyStatus.RECRUIT_PROGRESS),
                studyRepository.countByStudyStatus(Study.StudyStatus.STUDY_PROGRESS));
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

    private List<Task> updateTask(List<Task> originalTaskList, List<Task> newTaskList){
        originalTaskList.stream().forEach( originalTask ->
                taskService.deleteTask(originalTask.getTaskId()));
        originalTaskList.clear();
        originalTaskList.addAll(newTaskList);
        return originalTaskList;
    }
}
