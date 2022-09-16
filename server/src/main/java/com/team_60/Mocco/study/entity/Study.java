package com.team_60.Mocco.study.entity;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.audit.Auditable;
import com.team_60.Mocco.chatting.entity.Chatting;
import com.team_60.Mocco.chatting.entity.ChattingRoom;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task.entity.Task;
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
public class Study extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long studyId;

    @Column(length = 30, nullable = false)
    private String teamName;

    @Column(length = 50, nullable = false)
    private String summary;

    @Column(length = 5000, nullable = false)
    private String detail;

    @Column(length = 2000, nullable = false)
    private String rule;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private int capacity;

    @Column(length = 200)
    private String image;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member teamLeader;

    @OneToOne(mappedBy = "study", cascade = CascadeType.PERSIST)
    private ChattingRoom chattingRoom;

    @OneToMany(mappedBy = "study", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Task> taskList = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = {CascadeType.PERSIST,CascadeType.REMOVE},orphanRemoval = true, fetch = FetchType.LAZY)
    private List<StudyMember> studyMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Proposal> proposalList = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE,orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Chatting> chattingList = new ArrayList<>();

    @OneToMany(mappedBy = "study", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Alarm> alarmList = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private StudyStatus studyStatus = StudyStatus.RECRUIT_PROGRESS;

    public enum StudyStatus{
        RECRUIT_PROGRESS("recruit_progress"),
        RECRUIT_COMPLETE("recruit_complete"),
        STUDY_PROGRESS("study_progress"),
        STUDY_COMPLETE("study_complete");

        @Getter
        private String status;

        StudyStatus(String status){
            this.status = status;
        }
    }
}
