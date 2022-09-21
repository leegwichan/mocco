package com.team_60.Mocco.helper.scheduler;

import com.team_60.Mocco.dto.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.dto.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.study_member.repository.StudyMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

import static com.team_60.Mocco.study.entity.Study.StudyStatus.*;
import static com.team_60.Mocco.study_member.entity.StudyMember.StudyMemberEvaluationStatus.*;
import static com.team_60.Mocco.study_member.entity.StudyMember.StudyMemberStatus.INACTIVE;

@Component
@RequiredArgsConstructor
@Slf4j
public class Scheduler {
    private final StudyRepository studyRepository;
    LocalDate now = LocalDate.now();
    private final StudyMemberRepository studyMemberRepository;

    @Scheduled(cron = "0 0 1 * * *")
    public void changeStudyStatusStart(){
        List<Study> studyList = studyRepository.findByStartDate(now);
        if(studyList.size() == 0) throw new BusinessLogicException(ExceptionCode.NO_STUDY_OPEN);
        for(Study study : studyList){
            List<StudyMember> studyMemberList = studyMemberRepository.findByStudy(study);
            if(studyMemberList.size()>1 &&
                    (study.getStudyStatus() == RECRUIT_PROGRESS ||
                    study.getStudyStatus() == RECRUIT_COMPLETE)){
                study.setStudyStatus(STUDY_PROGRESS);
                studyRepository.save(study);
                log.info(study.getStudyId() + "모집중인 스터디 진행중으로 상태 변경");
            } else if(studyMemberList.size() <= 1) {
                studyRepository.delete(study);
                log.info(study.getStudyId() + "모집 인원이 모이지 않아서 스터디 삭제");
                throw new BusinessLogicException(ExceptionCode.NOT_MEMBER_ABOVE_2);
            }
        }
    }
    @Scheduled(cron = "0 0 1 * * *")
    public void changeStudyStatusEnd() throws InterruptedException {
        List<Study> studyList = studyRepository.findByEndDate(now);
        if(studyList.size() == 0) throw new BusinessLogicException(ExceptionCode.NO_STUDY_CLOSE);
        for(Study study : studyList){
            log.info(study.getStudyId() + "번 스터디");
            List<StudyMember> studyMemberList = studyMemberRepository.findByStudy(study);
            if(study.getStudyStatus() != STUDY_PROGRESS){
                log.info("스터디가 진행중이 아님");
                throw new BusinessLogicException(ExceptionCode.STUDY_NOT_PROGRESS);
            }
            studyMemberList.stream().forEach(n -> {
                n.setMemberStatus(INACTIVE);
                n.setEvaluationStatus(BEFORE_EVALUATION);
                studyMemberRepository.save(n);
            });
            log.info("스터디 멤버의 상태를 inactive, 평가전으로 바꿔줌");
        }
    }
    @Scheduled(cron = "0 0 1 * * *")
    public void changeStudyStatusEvaluation() throws InterruptedException {
        List<Study> studyList = studyRepository.findByEndDate(now.minusWeeks(2));
        if(studyList.size() == 0) throw new BusinessLogicException(ExceptionCode.NO_STUDY_EVALUATION);
        for(Study study : studyList){
            log.info(study.getStudyId() + "번 스터디");
            List<StudyMember> studyMemberList = studyMemberRepository.findByStudy(study);
            if(study.getStudyStatus() != STUDY_PROGRESS){
                log.info("스터디가 진행중이 아님");
                throw new BusinessLogicException(ExceptionCode.STUDY_NOT_PROGRESS);
            }
            studyMemberList.stream().forEach(n -> {
                if(n.getEvaluationStatus() == COMPLETE){
                    n.getStudy().setStudyStatus(STUDY_COMPLETE);
                    log.info("스터디 멤버의 상태가 평가 완료면 스터디 완료로 바꿔줌");
                } else{
                    n.setEvaluationStatus(NOT_EVALUATION);
                    log.info("평가 완료 상태 아닐 경우 평가 안함으로 상태 바꿈");
                }
                studyMemberRepository.save(n);
            });
        }

    }

}