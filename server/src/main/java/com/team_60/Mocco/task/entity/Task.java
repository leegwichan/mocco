package com.team_60.Mocco.task.entity;

import com.team_60.Mocco.audit.Auditable;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Task extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long task_id;

    @Column(nullable = false)
    private LocalDate deadline;

    @Column(length = 100, nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "STUDY_ID")
    private Study study;

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
    private List<TaskCheck> taskCheckList = new ArrayList<>();
}
