package com.team_60.Mocco.task.entity;

import com.team_60.Mocco.base_entity.BaseEntity;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Builder
public class Task extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taskId;

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
