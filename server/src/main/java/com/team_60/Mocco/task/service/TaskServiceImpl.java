package com.team_60.Mocco.task.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;
    @Override
    public Task updateTask(Task task) {
        Task findTask = findVerifiedTask(task.getTaskId());
        if(findTask.getStudy().getStudyId() != task.getStudy().getStudyId()){
            throw new BusinessLogicException(ExceptionCode.NOT_CORRECT_TASK);
        }
        Optional.ofNullable(task.getContent())
                .ifPresent(content -> findTask.setContent(content));
        Optional.ofNullable(task.getDeadline())
                .ifPresent(deadline -> findTask.setDeadline(deadline));

        return taskRepository.save(findTask);
    }
    public Task findVerifiedTask(long taskId){
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        Task findTask = optionalTask.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TASK_NOT_FOUND));
    return findTask;
    }

    @Override
    public void validateTask(Task task, Study study) {
        if(task.getDeadline().compareTo(study.getStartDate())<0 ||
        task.getDeadline().compareTo(study.getEndDate())>0){
            throw new BusinessLogicException(ExceptionCode.IMPOSSIBLE_TASK_DATE);
        }
    }

}
