package com.team_60.Mocco.reply.entity;

import com.team_60.Mocco.base_entity.BaseEntity;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Reply extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long replyId;

    @Column(length = 300, nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "COMMENT_ID", nullable = false)
    private Comment comment;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ReplyStatus replyStatus = ReplyStatus.REPLY_ACTIVE;

    public enum ReplyStatus{
        REPLY_ACTIVE("reply_active"),
        REPLY_DELETE("reply_delete");

        @Getter
        private String status;

        ReplyStatus(String status){
            this.status = status;
        }

    }
}
