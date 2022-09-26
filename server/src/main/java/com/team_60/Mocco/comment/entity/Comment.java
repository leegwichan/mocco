package com.team_60.Mocco.comment.entity;

import com.team_60.Mocco.audit.Auditable;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.study.entity.Study;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.CommandLineRunner;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(length = 300, nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column (length = 20, nullable = false)
    private CommentStatus commentStatus = CommentStatus.COMMENT_ACTIVE;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(optional = false)
    @JoinColumn(name = "STUDY_ID")
    private Study study;

    @OneToMany(mappedBy = "comment", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Reply> replyList = new ArrayList<>();

    public enum CommentStatus{
        COMMENT_ACTIVE("comment_active"),
        COMMENT_DELETE("comment_delete");

        @Getter
        private String status;

        CommentStatus(String status){
            this.status = status;
        }
    }
}
