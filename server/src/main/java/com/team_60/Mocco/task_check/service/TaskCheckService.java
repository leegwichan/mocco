package com.team_60.Mocco.task_check.service;

import com.team_60.Mocco.task_check.entity.TaskCheck;

public interface TaskCheckService {
    TaskCheck findTaskCheck(long taskCheckId);
    TaskCheck createTaskCheck(TaskCheck taskCheck);
    public TaskCheck findVerifiedTaskCheck(long taskCheckId);
}
