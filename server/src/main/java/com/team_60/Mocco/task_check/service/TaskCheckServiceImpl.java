package com.team_60.Mocco.task_check.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.service.TaskService;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import com.team_60.Mocco.task_check.repository.TaskCheckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskCheckServiceImpl implements TaskCheckService{

    private final MemberService memberService;
    private final TaskService taskService;
    private final TaskCheckRepository taskCheckRepository;

    @Override
    public TaskCheck getTaskCheck(long taskCheckId) {
        return findVerifiedTaskCheck(taskCheckId);
    }

    @Override
    public TaskCheck postTaskCheck(TaskCheck taskCheck) {
        Member findMember = memberService.findVerifiedMember(taskCheck.getMember().getMemberId());
        Task findTask = taskService.findVerifiedTask(taskCheck.getTask().getTaskId());
        findTaskCheckExpectNull(findMember, findTask);
        checkTaskCheckCondition(findMember, findTask);

        taskCheck.setMember(findMember);
        taskCheck.setTask(findTask);
        return taskCheckRepository.save(taskCheck);
    }

    private TaskCheck findVerifiedTaskCheck(long taskCheckId){
        Optional<TaskCheck> optionalTaskCheck = taskCheckRepository.findById(taskCheckId);
        TaskCheck findTaskCheck = optionalTaskCheck.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TASK_CHECK_NOT_FOUND));
        return findTaskCheck;
    }

    private void findTaskCheckExpectNull(Member member, Task task){
        taskCheckRepository.findByMemberAndTask(member, task)
                .ifPresent(m -> {
                    new BusinessLogicException(ExceptionCode.TASK_CHECK_NOT_FOUND);
                });
    }

    private void checkTaskCheckCondition(Member member, Task task){
        if (task.getStudy().getStudyStatus() != Study.StudyStatus.STUDY_PROGRESS){
            throw new BusinessLogicException(ExceptionCode.STUDY_NOT_PROGRESS);
        }

        for (StudyMember studyMember : task.getStudy().getStudyMemberList()){
            if (studyMember.getMember().getMemberId() == member.getMemberId()) return;
        }
        throw new BusinessLogicException(ExceptionCode.NOT_STUDY_MEMBER);
    }
}
