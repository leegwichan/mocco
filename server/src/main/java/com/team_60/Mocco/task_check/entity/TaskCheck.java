package com.team_60.Mocco.task_check.entity;

import com.team_60.Mocco.audit.Auditable;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.warning.entity.Warning;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class TaskCheck extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long task_check_id;

    @Column(length = 200, nullable = false)
    private String image;

    @Column(length = 300)
    private String content;

    @ManyToOne
    @JoinColumn(name = "TASK_ID")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToOne(mappedBy = "taskCheck", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Warning warning;
}
