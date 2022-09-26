package com.team_60.Mocco.warning.entity;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Warning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long warningId;

    @ManyToOne
    @JoinColumn(name = "STUDY_MEMBER_ID")
    private StudyMember studyMember;

    @OneToOne
    @JoinColumn(name = "TASK_CHECK_ID")
    private TaskCheck taskCheck;

    @OneToOne(mappedBy = "warning", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Alarm alarm;

    @Column(length = 50, nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private WarningType type;

    public enum WarningType{
        CHECK_WARNING("check_warning"),
        COMMON_WARNING("common_warning");

        @Getter
        private String type;

        WarningType(String type){
            this.type = type;
        }
    }
}
