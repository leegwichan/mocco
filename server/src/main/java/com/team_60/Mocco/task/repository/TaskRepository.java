package com.team_60.Mocco.task.repository;

import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByStudyOrderByDeadline(Study study);
}
