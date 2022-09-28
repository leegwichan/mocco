package com.team_60.Mocco.member.entity;

import com.team_60.Mocco.base_entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MyInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long myInfoId;

    @Column(length = 200)
    private String profileImage;

    @Column(length = 500)
    private String introduction;

    @Column(length = 100)
    private String location;

    @Column(nullable = false)
    private int evaluationTotal = 0;

    @Column(nullable = false)
    private int evaluationNumber = 0;

    @Column(length = 200)
    private String githubRepository1;

    @Column(length = 200)
    private String githubRepository2;

    @Column(length = 200)
    private String githubRepository3;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
