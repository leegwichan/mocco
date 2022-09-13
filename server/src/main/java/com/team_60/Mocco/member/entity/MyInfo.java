package com.team_60.Mocco.member.entity;

import com.team_60.Mocco.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MyInfo extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long myinfo_id;

    @Column(length = 200)
    private String profile_image;

    @Column(length = 500)
    private String introduction;

    @Column(length = 100)
    private String location;

    @Column(nullable = false)
    private int evaluation_total = 0;

    @Column(nullable = false)
    private int evaluation_number = 0;

    @Column(length = 200)
    private String github_repository1;

    @Column(length = 200)
    private String github_repository2;

    @Column(length = 200)
    private String github_repository3;
}
