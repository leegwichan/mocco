package com.team_60.Mocco.alarm.entity;

import com.team_60.Mocco.audit.Auditable;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.warning.entity.Warning;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Alarm extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long alarm_id;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 100, nullable = false)
    private AlarmType alarmType;

    @Column
    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "STUDY_ID")
    private Study study;

    @ManyToOne
    @JoinColumn(name = "WARNING_ID")
    private Warning warning;

    public enum AlarmType {
        STUDY_ENTER("STUDY_ENTER"),
        STUDY_OPEN("STUDY_OPEN"),
        STUDY_WARNING("STUDY_WARNING"),
        STUDY_NOT_OPEN("STUDY_NOT_OPEN");

        @Getter
        private String type;

        AlarmType(String type){
            this.type = type;
        }
    }
}
