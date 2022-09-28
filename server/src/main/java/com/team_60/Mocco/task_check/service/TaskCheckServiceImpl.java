package com.team_60.Mocco.task_check.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.repository.TaskRepository;
import com.team_60.Mocco.task.service.TaskService;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import com.team_60.Mocco.task_check.repository.TaskCheckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskCheckServiceImpl implements TaskCheckService{

    private final MemberService memberService;
    private final TaskService taskService;
    private final TaskRepository taskRepository;
    private final TaskCheckRepository taskCheckRepository;

    @Override
    @Transactional(readOnly = true)
    public TaskCheck findTaskCheck(long taskCheckId) {
        return findVerifiedTaskCheck(taskCheckId);
    }

    @Override
    public TaskCheck createTaskCheck(TaskCheck taskCheck) {
        Member findMember = memberService.findVerifiedMember(taskCheck.getMember().getMemberId());
        Task findTask = taskService.findVerifiedTask(taskCheck.getTask().getTaskId());
        findTaskCheckExpectNull(findMember, findTask);
        checkTaskCheckCondition(findMember, findTask);
        checkTaskUpload(findTask.getStudy(),findTask.getTaskId(),findMember);

        taskCheck.setMember(findMember);
        taskCheck.setTask(findTask);
        return taskCheckRepository.save(taskCheck);
    }

    public TaskCheck findVerifiedTaskCheck(long taskCheckId){
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

    private void checkTaskUpload(Study study, long taskId, Member member){
        List<Task> taskList = taskRepository.findByStudyOrderByDeadline(study);
        if(taskList.size()==0) throw new BusinessLogicException(ExceptionCode.TASK_NOT_FOUND);
        for(Task task : taskList){
            List<Member> memberList = task.getTaskCheckList().stream()
                    .map(n -> n.getMember()).collect(Collectors.toList());
            if(task.getTaskId() != taskId){
                if(memberList.contains(member)) continue;
                throw new BusinessLogicException(ExceptionCode.NOT_DONE_TASK);
            }
            if(memberList.contains(member)) throw new BusinessLogicException(ExceptionCode.TASK_ALREADY_DONE);
            break;
        }
    }
}
