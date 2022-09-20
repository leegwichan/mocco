package com.team_60.Mocco.task_check.repository;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskCheckRepository extends JpaRepository<TaskCheck, Long> {
    Optional<TaskCheck> findByMemberAndTask(Member member, Task task);
}
