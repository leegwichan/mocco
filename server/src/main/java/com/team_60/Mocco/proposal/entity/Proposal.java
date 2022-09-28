package com.team_60.Mocco.proposal.entity;

import com.team_60.Mocco.base_entity.BaseEntity;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Proposal extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long proposalId;

    @Column(length = 30, nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20)
    private ProposalStatus proposalStatus = ProposalStatus.PROPOSAL_WAITING;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "STUDY_ID")
    private Study study;

    public enum ProposalStatus{
        PROPOSAL_DENIED("proposal_denied"),
        PROPOSAL_WAITING("proposal_waiting"),
        PROPOSAL_ACCEPT("proposal_accept");

        @Getter
        private String status;

        ProposalStatus(String status){
            this.status = status;
        }
    }
}
