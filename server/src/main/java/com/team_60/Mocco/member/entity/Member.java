package com.team_60.Mocco.member.entity;

import com.team_60.Mocco.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long member_id;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 25, nullable = false)
    private String password;

    @Column(length = 10, nullable = false)
    private String nickname;

    @Column
    private String provider;

    @Column
    private String provider_id;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private MyInfo myInfo;
}
