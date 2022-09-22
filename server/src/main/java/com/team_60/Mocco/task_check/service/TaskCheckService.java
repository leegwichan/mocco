package com.team_60.Mocco.task_check.service;

import com.team_60.Mocco.task_check.entity.TaskCheck;

public interface TaskCheckService {
    TaskCheck getTaskCheck(long taskCheckId);
    TaskCheck postTaskCheck(TaskCheck taskCheck);
}
