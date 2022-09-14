package com.team_60.Mocco.study_member.entity;

import com.team_60.Mocco.audit.Auditable;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.warning.entity.Warning;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class StudyMember extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long study_member_id;

    @ManyToOne
    @JoinColumn(name = "STUDY_ID")
    private Study study;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "studyMember", cascade = CascadeType.REMOVE,orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Warning> warnings = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StudyMemberStatus member_status = StudyMemberStatus.ACTIVE;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StudyMemberEvaluationStatus evaluation_status = StudyMemberEvaluationStatus.BEFORE_EVALUATION;

    public enum StudyMemberStatus{
        ACTIVE("active"),
        INACTIVE("inactive");

        @Getter
        private String status;

        StudyMemberStatus(String status){
            this.status = status;
        }
    }

    public enum StudyMemberEvaluationStatus{
        BEFORE_EVALUATION("before_evaluation"),
        NOT_EVALUATION("not_evaluation"),
        COMPLETE("complete");

        @Getter
        private String evaluation_status;

        StudyMemberEvaluationStatus(String evaluation_status){
            this.evaluation_status = evaluation_status;
        }
    }

}
